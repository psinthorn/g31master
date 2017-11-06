import {
  Input, Output,
  EventEmitter,
} from '@angular/core';
import {
  ControlValueAccessor, Validator,
  AbstractControl, FormControl,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

import { isObjectEqual, booleanAttribute } from '@i3e/function';

export abstract class DataControl<T>
implements ControlValueAccessor, Validator {

  private _changeFn: Function;
  private _touchFn: Function;

  private outterControl: AbstractControl;

  private _value: T;
  private _control: FormControl;

  @Input('placeholder') private _placeholder: string | ((data: T) => string);
  private _readonly: boolean;
  @Input('readonly') private set __readonly(value) {
    this._readonly = booleanAttribute(value);
  }

  private _required: boolean;
  @Input('required') private set __required(value) {
    this._required = booleanAttribute(value);
  }

  @Output('dataTouch') private dataTouchEmitter: EventEmitter<void>;
  @Output('dataChange') private dataChangeEmitter: EventEmitter<T>;

  constructor() {
    this._changeFn = () => {};
    this._touchFn = () => {};

    this.outterControl = null;

    this._value = null;
    this._control = new FormControl(null, (control) => {
      if(this.outterControl) return this.outterControl.errors;

      return null;
    });

    this._placeholder = null;
    this._readonly = false;
    this._required = false;

    this.dataTouchEmitter = new EventEmitter<void>();
    this.dataChangeEmitter = new EventEmitter<T>();

    this.applyControlValueChange(this.control.valueChanges);
  }

  protected get changeFn() { return this._changeFn; }
  protected get touchFn() { return this._touchFn; }

  get value() { return this._value; }
  get control() { return this._control; }

  get placeholder() {
    if(typeof this._placeholder === 'function') {
      return this._placeholder(this.value);
    }

    return this._placeholder;
  }

  get readonly() { return this._readonly; }
  get required() { return this._required; }

  abstract writeToControl(obj: T): void;
  protected abstract applyControlValueChange(observable: Observable<any>): void;

  writeValue(obj: T): void {
    this._value = obj;
    this.writeToControl(obj);
  }

  registerOnChange(fn) {
    this._changeFn = fn;
  }

  registerOnTouched(fn) {
    this._touchFn = fn;
  }

  setDisabledState(isDisabled) {
    this.control.disable(isDisabled);
  }

  validate(control: AbstractControl) {
    if(this.outterControl === null) {
//console.debug('------------- data-control status was changed', control);
      this.outterControl = control;
      this.outterControl.statusChanges.subscribe(() => {
        this.control.updateValueAndValidity();
        this.control.markAsTouched();
      });
    }

    return null;
  }

  markAsTouched(): void {
    this.touchFn();
    this.dataTouchEmitter.emit();
  }

  protected updateValue(value: T): void {
    this._value = value;
    this.changeFn(this.value);
    this.control.updateValueAndValidity(/*{onlySelf: true}*/);
    this.dataChangeEmitter.emit(this.value);
  }

  protected isNewValue(oldValue: any, newValue: any): boolean {
    return !isObjectEqual(oldValue, newValue);
  }

  protected tryUpdateValue(value: T): void {
    if(this.isNewValue(this.value, value)) this.updateValue(value);
  }
}
