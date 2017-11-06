import {
  Directive, forwardRef,
  OnInit,
  Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// RxJS operator
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { ProcessorEngine } from '@i3e/processor';
import { DataLoader } from '@i3e/data-loader';
import { AdditionalObservable } from '@i3e/observable';
import { DataDelete } from '@i3e/data-service';

import { ProcessDescription } from './process-description.type';

import { ActionsProcessorEngine } from './actions-processor-engine';
import { LinksProcessorEngine } from './links-processor-engine';
import { DataLoaderProcessorEngine } from './data-loader-processor-engine';

import { ProcessDescriptionService } from './process-description.service';

import { ItemDeleteConfirmComponent } from '../item-delete-confirm.component';

export const csContextProcessorEngineDirective = {
  provide: ProcessorEngine,
  useExisting: forwardRef(() => ContextProcessorEngineDirective),
  multi: true,
};

export const csContextActoinsProcessorEngineDirective = {
  provide: ActionsProcessorEngine,
  useExisting: forwardRef(() => ContextProcessorEngineDirective),
};

export const csContextLinksProcessorEngineDirective = {
  provide: LinksProcessorEngine,
  useExisting: forwardRef(() => ContextProcessorEngineDirective),
};

export const csContextDataLoaderProcessorEngineDirective = {
  provide: DataLoaderProcessorEngine,
  useExisting: forwardRef(() => ContextProcessorEngineDirective),
};

@Directive({
  selector: '[csContextProcessor]',
  providers: [
    csContextProcessorEngineDirective,
    csContextActoinsProcessorEngineDirective,
    csContextLinksProcessorEngineDirective,
    csContextDataLoaderProcessorEngineDirective,
  ],
})
export class ContextProcessorEngineDirective<T, ED, DS extends DataDelete<ED>>
implements ActionsProcessorEngine, LinksProcessorEngine, DataLoaderProcessorEngine<T>,
    OnInit {
  actions: ProcessDescription[];
  links: ProcessDescription[];

  @Input('dataService') private _dataService: DS;
  @Input('descriptionOverride') private _descriptionOverride: {[key: string]: ProcessDescription};

  searchable: boolean;
  pgData: {[key: string]: any};
  data: T;

  constructor(
    private _loader: DataLoader<any>,
    private _processDescriptionService: ProcessDescriptionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _dialog: MatDialog,
  ) {
    this.actions = [];
    this.links = [];

    this._dataService = null;
    this._descriptionOverride = {};
    this.searchable = false;
    this.pgData = null;
    this.data = null;
  }

  ngOnInit() {
    this._loader.load$.subscribe((dataObservable) => {
      if(AdditionalObservable.isValid<any>(dataObservable)) {
        dataObservable.additionalSubscribe('context', (context) => {
console.debug('context:', context);
          this.searchable = !!context.searchable;
          this.pgData = context.pgData;
          this.data = context.data;
          this.actions.splice(0);
          this.links.splice(0);
          ['actions', 'links'].forEach((attr) => {
            (context[attr] || []).forEach((action) => {
              const description = Object.assign(
                this._processDescriptionService.createDescription(action),
                this._descriptionOverride[action],
              );
              description.action = this._createAction(action, context);
              this[attr].push(description);
            });
          });
        })
      }
    });
  }

  readonly reload = () => {
    this._loader.reload();
  }

  private _createAction(name: string, context) {
    const backFn = () => {
      this._location.back();
    };

    const deleteConfirmFn = (context) => {
      let dialogRef = this._dialog.open(ItemDeleteConfirmComponent, {
        disableClose: true
      });

      dialogRef.componentInstance.entityName = (context.refCode)? context.refCode : 'this item';

      return dialogRef.afterClosed();
    };

    const actionCreators = {
      delete: (context) => {
        const id = +context.data.id;
        return () => {
          if(!this._dataService) throw new Error(`${ this.constructor.name }::delete requires dataService property`);

          const infoSubject = new ReplaySubject<ED>(1);
          deleteConfirmFn(context)
            .filter((ans) => ans)
            .switchMap(() => this._dataService.delete(id))
            .subscribe((info) => {
              infoSubject.next(info);
              backFn();
            })
          ;

          return infoSubject.asObservable();
        }
      }
    };

    if(typeof actionCreators[name] === 'function') {
      return actionCreators[name](context);
    } else {
      return () => {
        this._router.navigate([name], {relativeTo: this._activatedRoute});
      };
    }
  }
}
