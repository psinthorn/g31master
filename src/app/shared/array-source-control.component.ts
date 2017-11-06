import {
  Component, forwardRef,
  Input, Output,
  EventEmitter,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, ControlValueAccessor,
  NG_VALIDATORS, Validator,
  FormControl,
} from '@angular/forms';

export const CS_ARRAY_SOURCE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ArraySourceControlComponent),
  multi: true,
};

export const CS_ARRAY_SOURCE_CONTROLL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ArraySourceControlComponent),
  multi: true,
}

export type DataCompareFunction<T> = (obj1: T, Obj2: T) => boolean;

@Component({
  selector: 'cs-array-source-control',
  templateUrl: './array-source-control.component.html',
  styleUrls: [ './array-source-control.component.less' ],
  providers: [
    CS_ARRAY_SOURCE_CONTROL_VALUE_ACCESSOR,
    CS_ARRAY_SOURCE_CONTROLL_VALIDATORS,
  ],
})
export class ArraySourceControlComponent
  implements ControlValueAccessor, Validator {
  private _values: any[];
  @Input('source') private _source: any[];
  private _disabled: boolean;

  private changeFn: (_: any) => void;
  private touchFn: () => void;
  private outterControl: FormControl;

  @Input('compareWith') private compareFn: DataCompareFunction<any>;
  @Output('dataTouch') dataTouchEmitter: EventEmitter<void>;

  private defaultCopareFn: DataCompareFunction<any>;

  constructor() {
    this._values = [];
    this._source = [];
    this._disabled = false;

    this.changeFn = null;
    this.touchFn = null;
    this.compareFn = null;

    this.defaultCopareFn = (obj1, obj2) => {
      return obj1 === obj2;
    };
  }

  get values() { return this._values; }
  get source() { return this._source || []; }
  get disabled() { return this._disabled; }
  get errors() {
    if(this.outterControl === null) return null;

    return this.outterControl.errors;
  }

  protected updateValue(){
    this.changeFn(this.values);
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
    this._disabled = isDisabled;
  }

  validate(control: FormControl) {
    this.outterControl = control;

    return null;
  }

  markAsTouched() {
    this.touchFn();
    this.dataTouchEmitter.emit();
  }

  compare(comparedItem: any, item: any) {
    return (typeof this.compareFn === 'function')?
      this.compareFn(comparedItem, item)
    :
      this.defaultCopareFn(comparedItem, item)
    ;
  }

  findIndex(item: any) {
    const index = this.values.findIndex((obj) => {
      return this.compare(obj, item);
    });
    return index;
  }

  checked(item: any) {
    const index = this.findIndex(item);
    return index >= 0;
  }

  change(checked: boolean, item: any) {
    if(checked) {
      this.values.push(item);
    } else {
      const index = this.findIndex(item);
      this.values.splice(index, 1);
    }

    this.updateValue();
  }
}
