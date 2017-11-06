import {
  Component, OnInit,
  Input, Output, ViewChild,
  EventEmitter, forwardRef, ElementRef
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR, ControlValueAccessor,
    NG_VALIDATORS, Validator,
    FormControl, ValidationErrors
} from '@angular/forms';

import { FormControlProperties } from './form.base';

import { Observable } from 'rxjs/Observable';

// RxJS methods
import 'rxjs/observable/of';

// RxJS operators
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';

// RxJS for test
import 'rxjs/add/operator/map';

function isEmpty(value: any) {
  return ((typeof value === 'undefined') || (value === null) || value === '');
}

export const CS_SEARCHABLE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchableControlComponent),
  multi: true,
};

export const CS_SEARCHABLE_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SearchableControlComponent),
  multi: true,
}

const minTypeLength = 3;
const debounceTime = 300;

@Component({
  selector: 'cs-searchable-control',
  templateUrl: './searchable-control.component.html',
  styleUrls: [ './searchable-control.component.less' ],
  providers: [
    CS_SEARCHABLE_CONTROL_VALUE_ACCESSOR,
    CS_SEARCHABLE_CONTROL_VALIDATORS,
  ],
  exportAs: 'csSearchableControl'
})
export class SearchableControlComponent
  implements
    FormControlProperties<any>,
    OnInit, ControlValueAccessor, Validator {
  private _value: any;
  private formControl: FormControl;
  private _searchControl: FormControl;
  private lastSearchValue: string;

  private _itemsAutoComplete: any;

  private changeFn: (_: any) => void;
  private touchFn: () => void;

  @Input('labelWith') private labelFn: string | ((_:any) => any);

  @Input() set itemsAutoComplete(value: any) {
    this._itemsAutoComplete = value;
  };

  private _freeEnter: boolean;
  @Input() set freeEnter(value: any) {
    this._freeEnter = (value === '') || !!value;
  }

  @Output('searchChange') searchChangeEmitter: EventEmitter<string>;
  @Output('dataTouch') dataTouchEmitter: EventEmitter<void>;

  constructor() {
    this._value = null;
    this.formControl = null;
    this._searchControl = new FormControl(null, (control) => {
      return this.errors;
    });
    this.lastSearchValue = null;

    this._itemsAutoComplete = null;

    this.changeFn = null;
    this.touchFn = null;

    this.labelFn = null;

    this._freeEnter = false;

    this.searchChangeEmitter = new EventEmitter<string>();
    this.dataTouchEmitter = new EventEmitter<void>();
  }

  get value() { return this._value; }
  get errors() {
    if(this.formControl) return this.formControl.errors;

    return null;
  }
  get label() {
    if(typeof this.labelFn === 'function'){
      return this.labelFn(this.value);
    } else if(typeof this.labelFn === 'string'){
      return this.labelFn;
    }

    return '';
  }
  get searchControl() { return this._searchControl; }
  get disabled() { return this.searchControl.disabled; }
  get itemsAutoComplete() { return this._itemsAutoComplete; }
  get freeEnter() { return this._freeEnter; }

  private changeValue(value: any){
    if(value !== this.value){
      this._value = value;
      this.changeFn(value);
      this.searchControl.updateValueAndValidity(/*{ onlySelf: true}*/);
    }
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .startWith(null)
      .switchMap((value) => {
        if(typeof value === 'object'){
          this.changeValue(value);
          return Observable.of(null);
        }

        if(this.freeEnter) this.changeValue(value);

        return Observable.of(value)
          .filter((value) => (value && (value.length >= minTypeLength)))
          .debounceTime(debounceTime)
          .filter((value) => (value && (value !== this.lastSearchValue)))
        ;
      })
      .subscribe((value) => {
        this.lastSearchValue = value;
        this.searchChangeEmitter.emit(value);
      })
    ;
  }

  writeValue(obj: any) {
    Promise.resolve(null).then(() => {
      this._value = obj;
      this.searchControl.setValue(obj);
    });
  }

  registerOnChange(fn) {
    this.changeFn = fn;
  }

  registerOnTouched(fn) {
    this.touchFn = fn;
  }

  setDisabledState(isDisabled) {
    this.searchControl.disable(isDisabled);
  }

  validate(control: FormControl) {
    this.formControl = control;
    if(control.errors) {
      this.searchControl.updateValueAndValidity();
      this.searchControl.markAsTouched();
    }

    return null;
  }

  markAsTouched() {
    this.touchFn();
    this.dataTouchEmitter.emit();
  }

  reset() {
    if(!this.freeEnter) setTimeout(() => {
      this.searchControl.setValue(this.value);
    }, 100);
  }

  clear() {
    this.searchControl.setValue(null);
  }
}
