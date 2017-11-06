import { Input, Output, OnInit, EventEmitter } from '@angular/core';
import {
    ControlValueAccessor, Validator,
    FormControl,
} from '@angular/forms';

import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';

// RxJS methods
import 'rxjs/observable/of';

// RxJS operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Account } from '../model';

import { DataGetAll, DataObservableFunction } from '@consol/shared'

export abstract class AccountSearchableControlBase<T extends Account>
  implements OnInit, ControlValueAccessor, Validator {
  private _formControl: FormControl;
  private searchSubject: Subject<string>;
  private _items$: Observable<T[]>;

  protected changeFn: (_: any) => void;
  protected touchFn: () => void;

  protected defaultDataObservableFn: DataObservableFunction<T>;
  protected defaultLabelFn: (_:any) => string;
  protected defaultDisplayFn: (_:any) => any;

  private _freeEnter: boolean;
  @Input('freeEnter') set freeEnter(value: any) {
    this._freeEnter = (value === '') || !!value;
  }

  @Input('dataObservableWith') private dataObservableFn: DataObservableFunction<T>;
  @Input('displayWith') private displayFn: (_:any) => any;
  @Input('labelWith') private labelFn: (_:any) => any | string;

  @Output('dataTouch') dataTouchEmitter: EventEmitter<void>;

  constructor(
    private ds: DataGetAll<T>,
  ) {
    this._formControl = new FormControl();
    this.searchSubject = new Subject();

    this._freeEnter = false;

    this.defaultDataObservableFn = (value: string, ds: DataGetAll<T>) => {
      return ds
        .getAll({ term: value })
        .catch((err) => {
          console.error('data observable error:', err);
          return Observable.of({data: []});
        })
        .map((metaData) => {
          return metaData.data;
        })
      ;
    };

    this._items$ = this.searchSubject.asObservable()
      .switchMap((value) => {
        if(value === null){
          return Observable.of([] as T[]);
        }

        return (typeof this.dataObservableFn === 'function')?
          this.dataObservableFn(value, this.ds)
        :
          this.defaultDataObservableFn(value, this.ds)
        ;
      })
    ;

    this.defaultDisplayFn = (item: any) => {
      if(item === null) return null;
      return (item && item.name)? item.name : null;
    }

    this.dataTouchEmitter = new EventEmitter<void>();

    this.dataObservableFn = null;
    this.displayFn = null;
    this.labelFn = null;
  }

  get value() { return this.formControl.value; }
  get freeEnter() { return this._freeEnter; }
  get formControl() { return this._formControl; }
  get items$() { return this._items$; }
  get displayWith() {
    return (this.displayFn)? this.displayFn : this.defaultDisplayFn;
  }
  get labelWith() { return this.labelFn; }

  protected changeValue(value: T){
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

export abstract class AccountSearchableArrayControlBase<T extends Account>
  implements OnInit, ControlValueAccessor, Validator {
  private _values: T[];
  private outterControl: FormControl;
  private _formControl: FormControl;

  protected changeFn: (_: any) => void;
  protected touchFn: () => void;

  @Output('dataTouch') dataTouchEmitter: EventEmitter<void>;

  @Input('dataObservableWith') private dataObservableFn: DataObservableFunction<T>;
  @Input('labelWith') private labelFn: (_:any) => any | string;

  constructor() {
    this._values = [];
    this.outterControl = null;
    this._formControl = new FormControl(null, (control: FormControl) => {
      if(this.outterControl !== null) return this.outterControl.errors;

      return null;
    });

    this.dataTouchEmitter = new EventEmitter<void>();

    this.dataObservableFn = null;
    this.labelFn = null;
  }

  get values() { return this._values; }
  get formControl() { return this._formControl; }
  get dataObservableWith() { return this.dataObservableFn; }
  get labelWith() { return this.labelFn; }

  ngOnInit() {
    this.formControl.valueChanges
      .subscribe((value) => {
        this.addItem(value);
      })
    ;
  }

  protected updateValue(){
    this.changeFn(this.values);
    this.formControl.setValue(null);
    //this.formControl.updateValueAndValidity({onlySelf: true});
  }

  addItem(value: T) {
    if(value !== null){
      this.values.push(value);
      this.updateValue();
    }
  }

  removeItem(index: number) {
    this.values.splice(index, 1);
    this.updateValue();
    this.formControl.updateValueAndValidity(/*{onlySelf: true}*/);
  }

  writeValue(obj: any) {
    this._values = obj;
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
    this.outterControl = control;
    if(control.errors) this.formControl.updateValueAndValidity();

    return null;
  }

  markAsTouched() {
    this.touchFn();
    this.dataTouchEmitter.emit();
  }
}

export class AccountControlBase<T extends Account>
  extends AccountSearchableControlBase<T> {
  constructor(ds: DataGetAll<T>) {
    super(ds);
  }
}

export class AccountArrayControlBase<T extends Account>
  extends AccountSearchableArrayControlBase<T> {
  constructor() {
    super();
  }
}
