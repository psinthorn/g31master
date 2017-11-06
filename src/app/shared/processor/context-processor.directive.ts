// TODO: remove
/*
import {
  Directive, forwardRef, Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// RxJS operator
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { AdditionalObservable } from '@i3e/observable';

import { DataSave, DataDelete } from '@i3e/data-service';

import {
  Processor, ProcessorReady,
  additionalProcessorDirectiveName,
  AdditionalProcessorEngine,
} from '@i3e/processor';

import { capitalize } from '@i3e/function';

import { ItemDeleteConfirmComponent } from '@consol/shared';

export const csContextActionProcessorEngine: any = {
  provide: AdditionalProcessorEngine,
  useExisting: forwardRef(() => ContextProcessorDirective),
  multi: true,
};

export type ApparentDescription = {
  name?: string,
  icon?: string,
  label?: string,
  color?: string,
};

export type ActionDescription = ApparentDescription & {
  action?: Function,
  execute?: Function,
};

export const defaultApparentDescription: ApparentDescription = {icon: 'input'};

export const predefineApparentDescriptions: {[key: string]: ApparentDescription} = {
  add: { icon: 'add', color: 'primary' },
  edit: { icon: 'edit', color: 'primary' },
  delete: { icon: 'delete_forever', color: 'warn' },
  print: { icon: 'print', color: 'primay' },

  save: { icon: 'save', color: 'primary' }
};

@Directive({
  selector: `[${ additionalProcessorDirectiveName }="csContext"], [csContextEngine]`,
  providers: [csContextActionProcessorEngine],
})
export class ContextProcessorDirective<T, ED, DS extends DataDelete<ED>>
implements AdditionalProcessorEngine, ProcessorReady {
  get priority() { return 1; }

  @Input('dataService') private _dataService: DS;
  @Input('processorOverrides') private _processorOverrides: {[key: string]: ApparentDescription};
  @Input('processorProperties') private _processorProperties: {[key: string]: any};

  private _apparentDescriptions: {[key: string]: ApparentDescription};
  private _processorSubject: Subject<Processor>;

  constructor(
    private _location: Location,
    private _dialog: MatDialog,
  ) {
    this._processorOverrides = {};
    this._processorProperties = {};
    this._apparentDescriptions = {};
    this._processorSubject = new ReplaySubject<Processor>(1);

    Object.assign(this.apparentDescriptions, predefineApparentDescriptions);
  }

  protected get location() { return this._location; }
  protected get dialog() { return this._dialog; }

  protected get dataService() { return this._dataService; }
  protected get processorOverrides() { return this._processorOverrides; }
  protected get processorProperties() { return this._processorProperties; }

  protected get apparentDescriptions() { return this._apparentDescriptions; }

  initProcessor(additionalObservable: AdditionalObservable<T>, target: Processor) {
    additionalObservable.additionalSubscribe('context', (context) => {
      Object.keys(context || {}).forEach((key) => target[key] = context[key]);
      target.actions = [];
      (context.actions || []).forEach((action) => {
        target.actions.push(Object.assign(
          this.__createDefaultAction(action, context),
          this.processorOverrides[action],
        ));
      });
      target.links = [];
      (context.links || []).forEach((link) => {
        target.links.push(Object.assign(
          this.__createDefaultLink(link, context),
          this.processorOverrides[link],
        ));
      });

      this._processorSubject.next(target);
    });
  }

  get processorReady$() { return this._processorSubject.asObservable(); }

  protected __createDefaultAction(action: string, context: any) {
    const description:ActionDescription = Object.assign({name: action},
      defaultApparentDescription, this.apparentDescriptions[action],
    );

    if(!description.label) description.label = capitalize(action);
    if(!description.action && (typeof this[action] === 'function')) {
      description.action = this[action](context);
    }

    return description;
  }

  protected __createDefaultLink(link: string, context: any) {
    const description:ActionDescription = Object.assign({name: link},
      defaultApparentDescription, this.apparentDescriptions[link],
    );

    if(!description.label) description.label = capitalize(link);

    return description;
  }

  protected __back() {
    this.location.back();
  }

  protected __deleteConfirm(context): Observable<any> {
    let dialogRef = this.dialog.open(ItemDeleteConfirmComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.entityName = (this.processorProperties.entityName)?
      this.processorProperties.entityName
      :
      (context.refCode)? context.refCode : 'this item'
    ;

    return dialogRef.afterClosed();
  }

  delete(context) {
    const id = +context.data.id;
    return () => {
      if(!this.dataService) throw new Error(`${ this.constructor.name }::delete requires dataService property`);

      const infoSubject = new ReplaySubject<ED>(1);
      ((typeof this.processorProperties.deleteConfirm === 'function')?
        this.processorProperties.deleteConfirm()
        :
        this.__deleteConfirm(context)
      )
        .filter((ans) => ans)
        .switchMap(() => this.dataService.delete(id))
        .subscribe((info) => {
          infoSubject.next(info);
          this.__back();
        })
      ;

      return infoSubject.asObservable();
    };
  }
}
*/
