import { Component, forwardRef, OnInit, Input } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor, Validator,

  FormControl,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

/// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/map';


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
export class ProjectBoqBudgetTypeControlComponent
implements  OnInit, ControlValueAccessor, Validator {
  protected changeFn: (_: any) => void;
  protected touchFn: () => void;

  private _control: FormControl;
  private _outterControl: FormControl;

  private projectBoqSubject: Subject<ProjectBoq>;

  @Input('projectBoq') private set projectBoq(value) {
    this.projectBoqSubject.next(value);
  }
  private items: ProjectBoqBudgetType[];
  private _item$: Observable<ProjectBoqBudgetType[]>;
  @Input('dataObservable') private set dataObservable(value) {
    if(value !== this.item$) {
      this._item$ = value.map((data) => {
        this.items = data;
        if(this.items && this.items.length == 1) {
          this.control.setValue(this.items[0].id);
        }
        return data;
      });
    }
  };
  @Input('labelWith') private labelFn: (_:any) => any | string;

  constructor() {
    this._control = new FormControl();
    this.items = null;
    this._item$ = null;

    this.projectBoqSubject = new BehaviorSubject<ProjectBoq>(null);
  }

  get control() { return this._control; }
  get item$() { return this._item$; }
  get label() {
    if(typeof this.labelFn === 'function') {
      return this.labelFn(this.control.value);
    } else if(typeof this.labelFn === 'string') {
      return this.labelFn;
    }

    return null;
  }

  ngOnInit() {
    if(!this.item$) {
      let existedProjectBoq: ProjectBoq = null;
      this.dataObservable = this.projectBoqSubject
        .filter((projectBoq) => {
          if(projectBoq === existedProjectBoq) return false;
          if(projectBoq && existedProjectBoq && (projectBoq.id == existedProjectBoq.id)) return false;

          existedProjectBoq = projectBoq;
          return true;
        })
        .map((projectBoq) => {
console.debug('budget type:', projectBoq);
          if(!projectBoq) return null;
          return projectBoq.budgetTypes;
        })
      ;
    }

    this.control.valueChanges.subscribe((value) => {
      if(!this.items) return;
      for(let item of this.items){
        if(value == item.id){
          this.changeFn(item);
          break;
        }
      }
    })
  }

  writeValue(obj: any) {
    Promise.resolve(null).then(() => {
      this.control.setValue(obj && obj.id);
    });
  }

  registerOnChange(fn) {
    this.changeFn = fn;
  }

  registerOnTouched(fn) {
    this.touchFn = fn;
  }

  setDisabledState(isDisabled) {
    this.control.disable(isDisabled);
  }

  validate(control: FormControl) {
    this.control.setValidators(control.validator);

    return null;
  }
}
