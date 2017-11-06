import {
  Component, forwardRef, Self,
  Input, Optional,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor, Validator,

  FormControl,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { isObjectEqual } from '@i3e/function';

import { DataLoader } from '@i3e/data-loader';

import { ObservableCache } from '@i3e/observable-cache';

import { DataControl } from '@consol/shared';

import { ProjectBoq } from '../model';

import { ProjectBoqService } from '../project-boq.service';

// stub service
import { ProjectBoqStubService } from '../project-boq.stub-service';

export const CS_PROJECT_BOQ_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectBoqControlComponent),
  multi: true,
};

export const CS_PROJECT_BOQ_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ProjectBoqControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-project-boq-control',
  templateUrl: '../template/project-boq-control/project-boq-control.component.html',
  styleUrls: [ '../template/project-boq-control/project-boq-control.component.less' ],
  providers: [
    CS_PROJECT_BOQ_CONTROL_VALUE_ACCESSOR,
    CS_PROJECT_BOQ_CONTROL_VALIDATORS,
    { provide: ProjectBoqService, useClass: ProjectBoqStubService },
  ],
})
export class ProjectBoqControlComponent extends DataControl<ProjectBoq> {
  private items: ProjectBoq[];
  private _items$: Observable<ProjectBoq[]>;
  private _defaultObservable: () => Observable<ProjectBoq[]>;

  constructor(
    private ds: ProjectBoqService,
    @Optional() @Self() private loader: DataLoader<ProjectBoq[]>,
    @Optional() @Self() private cache: ObservableCache<ProjectBoq[]>,
  ) {
    super();

    this._defaultObservable = () => {
      return this.ds.getAll()
        .catch((err) => {
          console.error('data observable error:', err);
          return Observable.of(null);
        })
        .do((items) => {
          this.items = items;
        })
      ;
    };

    this._items$ = (this.loader)?
      this.loader.data$
    :
      ((this.cache)? this.cache.get(this.defaultObservable) : this.defaultObservable())
    ;
  }

  get items$() { return this._items$; }
  get defaultObservable() { return this._defaultObservable; }

  writeToControl(obj: ProjectBoq): void {
    this.control.setValue((obj && obj.id)? obj.id : null);
  }

  protected applyControlValueChange(observable: Observable<any>): void {
    observable.subscribe((value) => {
      if(!this.items) return;
      for(let item of this.items){
        if(value == item.id){
          this.tryUpdateValue(item);
          break;
        }
      }
    });
  }
}
