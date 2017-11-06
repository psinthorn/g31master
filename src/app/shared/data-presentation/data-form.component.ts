import {
  Component, Self, Inject,
  Input,
} from '@angular/core';

import { AbstractControl, FormControl, FormGroup, FormArray  } from '@angular/forms';

import { Observable } from 'rxjs';

import { Processor } from '@i3e/processor';

import { DataPresentation } from './data-presentation';

import { FormProcessorEngine } from '../processor';

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
  selector: 'cs-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: [ './data-form.component.less' ]
})
export class DataFormComponent<T, ES> extends DataPresentation<FormProcessorEngine<T, ES>> {
  @Input('formGroup') private _formGroup: FormGroup;

  private _formPadding: boolean;

  constructor(
    @Inject(Processor) @Self() processor: FormProcessorEngine<T, ES>,
  ) {
    super(processor);

    this._formGroup = null;
    this._formPadding = false;
  }

  get formGroup() { return this._formGroup; }
  get formPadding() { return this._formPadding; }

  save(ev: any) {
    if(ev.target.ownerDocument.activeElement.type !== 'submit') return;

    this.formGroup.updateValueAndValidity();

    if(this.formGroup.invalid){
      console.debug('Invalid Form Data:', getDeepErrors(this.formGroup, true));
      return;
    }

    if(typeof this.processor.save === 'function') {
      const data = this.formGroup.value;
      this._formPadding = true;
      this.processor.save(data).subscribe(
        () => {
          console.debug('saved');
          this._formPadding = false;
        },
        (err) => {
          console.debug(err);
          this._formPadding = false;
        }
      );
    } else {
      console.error(`save process not found in processor`, this.processor);
    }
  }

  cancel() {
console.debug('processor:', this.processor);
    if(typeof this.processor.cancel === 'function') {
      this.processor.cancel();
    } else {
      console.error(`cancel process not found in processor`, this.processor);
    }
  }
}
