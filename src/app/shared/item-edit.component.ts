import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormArray  } from '@angular/forms';

import { Observable } from 'rxjs';

import { MetaDataBase } from './model';
import { ItemCoreComponent } from './item-core.component';

export function getDeepErrors(control: AbstractControl, touch?: boolean): any {
  let errors: any;

  if(touch) control.markAsTouched();

  if(control instanceof FormControl){
    if(control.invalid) errors = control.errors;
  } else if(control instanceof FormGroup){
    if(control.invalid){
      errors = {};
      Object.keys(control.controls).forEach((name) => {
        let subControl = control.controls[name];
        if(subControl.invalid) errors[name] = getDeepErrors(subControl, touch);
      });
    }
  } else if(control instanceof FormArray){
    if(control.invalid){
      errors = {};
      for(let i = 0; i < control.length; i++){
        let subControl = control.at(i);
        if(subControl.invalid) errors[i] = getDeepErrors(subControl, touch);
      }
    }
  }

  return errors;
}

@Component({
  selector: 'item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: [ './item-edit.component.less' ]
})
export class ItemEditComponent extends ItemCoreComponent {
  /*
  @Input('metaData') protected _metaData;
  @Input('operators') protected _operators?;
  */

  @Input('formGroup') private _formGroup: FormGroup;

  private _formPadding: boolean;

  constructor() {
    super();

    this._formGroup = null;
    this._formPadding = false;
  }

  get formGroup() { return this._formGroup; }
  get formPadding() { return this._formPadding; }

  save() {
    this.formGroup.updateValueAndValidity();

    if(this.formGroup.invalid){
      console.debug('Invalid Form Data:', getDeepErrors(this.formGroup, true));
      return;
    }

    let fn: () => Observable<any> = this.operators['save'];

    if(typeof fn === 'function'){
      this._formPadding = true;
      fn().subscribe(
        () => {
          console.debug('saved');
          this._formPadding = false;
        },
        (err) => {
          console.debug(err);
          this._formPadding = false;
        }
      );
    }
  }
}
