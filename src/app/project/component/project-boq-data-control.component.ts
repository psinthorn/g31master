import { Component, forwardRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor, Validator,

  FormControl,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// RxJS methods
import 'rxjs/observable/of';

// RxJS operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  ProjectBoqBudgetType,
  ProjectBoq, ProjectBoqData,
} from '../model';

export const CS_PROJECT_BOQ_DATA_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectBoqDataControlComponent),
  multi: true,
};

export const CS_PROJECT_BOQ_DATA_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ProjectBoqDataControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-project-boq-data-control',
  templateUrl: '../template/project-boq-data-control/project-boq-data-control.component.html',
  styleUrls: ['../template/project-boq-data-control/project-boq-data-control.component.less'],
  providers: [
    CS_PROJECT_BOQ_DATA_CONTROL_VALUE_ACCESSOR,
    CS_PROJECT_BOQ_DATA_CONTROL_VALIDATORS,
  ],
})
export class ProjectBoqDataControlComponent
implements OnInit, ControlValueAccessor, Validator {
  private _formControl: FormControl;
  private searchSubject: Subject<string>;
  private _items$: Observable<ProjectBoqData[]>;

  protected changeFn: (_: any) => void;
  protected touchFn: () => void;

  protected defaultLabelFn: (_:any) => string;
  protected defaultDisplayFn: (_:any) => any;

  @Input('projectBoq') private _projectBoq: ProjectBoq;
  @Input('displayWith') private displayFn: (_:any) => any;
  @Input('labelWith') private labelFn: (_:any) => any | string;

  @Output('dataTouch') dataTouchEmitter: EventEmitter<void>;

  constructor() {
    this._formControl = new FormControl();
    this.searchSubject = new Subject();

    this._items$ = this.searchSubject.asObservable()
      .map((value) => {
        if(value === null || !this.projectBoq){
          return [];
        }

        const terms = value.split(' ');
        const regxs = terms.map((term) => {
          const escapedTerm = term.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&');
          return new RegExp(escapedTerm, 'ig');
        });

        return this.filterBoq(regxs, this.projectBoq);
      })
    ;
    this._projectBoq = null;

    function deepSearch(boq: ProjectBoqData, target: ProjectBoqData): string[] {
      if(boq.id == target.id) return [boq.name];
      for(let child of boq.children) {
        let results: string[];
        if((results = deepSearch(child, target)) !== null) {
          return [boq.name].concat(results);
        }
      }

      return null;
    }

    this.defaultDisplayFn = (item: any) => {
      if(item === null) return null;
      if(this.projectBoq === null) return null;

      let results: string[];
      for(let child of this.projectBoq.children) {
        if((results = deepSearch(child, item)) !== null) break;
      }

      return results.join('>');
    }

    this.dataTouchEmitter = new EventEmitter<void>();

    this.displayFn = null;
    this.labelFn = null;
  }

  get value() { return this.formControl.value; }
  get formControl() { return this._formControl; }
  get projectBoq() { return this._projectBoq; }
  get items$() { return this._items$; }
  get displayWith() {
    return (this.displayFn)? this.displayFn : this.defaultDisplayFn;
  }
  get labelWith() { return this.labelFn; }

  protected filterBoq(regxs: RegExp[], boq: ProjectBoqData): ProjectBoqData[] {
    let result: ProjectBoqData[] = [];
    const nextRegxs: RegExp[] = [];

    regxs.forEach((regx) => {
      if(!boq.name.match(regx)) nextRegxs.push(regx);
    });

    if(boq.children && (boq.children.length > 0)){
      for(let child of boq.children) {
        result = result.concat(this.filterBoq(nextRegxs, child));
      }
    } else {
      if(nextRegxs.length === 0) result.push(boq);
    }

    return result;
  }

  protected changeValue(value){
    this.changeFn(value);
  }

  ngOnInit() {
    this.formControl.valueChanges
      .subscribe((value) => {
        this.changeValue(value);
      })
    ;
  }

  writeValue(obj: any) {
    Promise.resolve(null).then(() => {
      this.formControl.setValue(obj);
    });
  }

  registerOnChange(fn) {
    this.changeFn = fn;
  }

  registerOnTouched(fn) {
    this.touchFn = fn;
  }

  setDisabledState(isDisabled) {
    this.formControl.disable(isDisabled);
  }

  validate(control: FormControl) {
    this.formControl.setValidators(control.validator);

    return null;
  }

  search(value: string) {
    this.searchSubject.next(value);
  }

  markAsTouched() {
    this.touchFn();
    this.dataTouchEmitter.emit();
  }
}
