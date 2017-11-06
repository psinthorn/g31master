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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

/// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { isObjectEqual } from '@i3e/function';

import { DataLoader } from '@i3e/data-loader';

import { ObservableCache } from '@i3e/observable-cache';

import { DataControl } from '@consol/shared';

import { ProjectBoq, ProjectBoqBudgetType } from '../model';

export const CS_PROJECT_BOQ_BUDGET_TYPE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectBoqBudgetTypeControlComponent),
  multi: true,
};

export const CS_PROJECT_BOQ_BUDGET_TYPE_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ProjectBoqBudgetTypeControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-project-boq-budget-type-control',
  templateUrl: '../template/project-boq-budget-type-control/project-boq-budget-type-control.component.html',
  styleUrls: [ '../template/project-boq-budget-type-control/project-boq-budget-type-control.component.less' ],
  providers: [
    CS_PROJECT_BOQ_BUDGET_TYPE_CONTROL_VALUE_ACCESSOR,
    CS_PROJECT_BOQ_BUDGET_TYPE_CONTROL_VALIDATORS,
  ],
})
export class ProjectBoqBudgetTypeControlComponent extends DataControl<ProjectBoqBudgetType> {
  private projectBoqSubject: Subject<ProjectBoq>;

  @Input('projectBoq') private set projectBoq(value) {
    this.projectBoqSubject.next(value);
  }

  private items: ProjectBoqBudgetType[];
  private _items$: Observable<ProjectBoqBudgetType[]>;

  constructor() {
    super();

    this.projectBoqSubject = new BehaviorSubject<ProjectBoq>(null);

    this._items$ = this.projectBoqSubject
      .catch((err) => {
        console.error('data observable error:', err);
        return Observable.of(null);
      })
      .map((projectBoq: ProjectBoq) => {
        if(!projectBoq) {
          this.items = null;
          return null;
        }
        this.items = projectBoq.budgetTypes;
        return this.items;
      })
    ;
  }

  get items$() { return this._items$; }

  writeToControl(obj: ProjectBoqBudgetType): void {
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
