import { Directive, Component, ElementRef, Optional, Input, OnInit } from '@angular/core';
import { FormGroupDirective, AbstractControl } from '@angular/forms';
import { MatFormField } from '@angular/material';

@Directive({
  selector: '[formControlError]'
})
export class FormControlErrorDirective implements OnInit {
  @Input('formControlError') private _formControlName: string;

  constructor(
    private elemRef: ElementRef,
    @Optional() private matInputContainer: MatFormField,
    @Optional() private formGroupDirective: FormGroupDirective
  ) { }

  ngOnInit(){
    if(!this.matInputContainer && (!this._formControlName || !this.formGroupDirective)){
      throw new Error(
        'FormControlErrorDirective cannot be used without MatFormField or FormControlName with FromGroup'
      );
    }

    let control: AbstractControl =
      (this.matInputContainer)?
        //this.matInputContainer._matInputChild._ngControl.control :
        this.matInputContainer._control.ngControl.control :
        this.formGroupDirective.form.controls[this._formControlName]
    ;

    control.statusChanges.subscribe((value) => {
      let message = '';
      if(control.invalid){
        let errorCode = Object.keys(control.errors)[0];
        let error = control.errors[errorCode];
        if(typeof error === 'object'){
          let messages = [];
          Object.keys(error).forEach((key) => {
            messages.push(`${key}: ${error[key]}`);
          });
          message = messages.join(' ,');
        } else{
          message = errorCode;
        }
      }
      this.elemRef.nativeElement.textContent = message;
    });
  }
}
