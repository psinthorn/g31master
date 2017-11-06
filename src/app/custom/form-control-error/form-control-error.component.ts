import { Component, Optional, Input, OnInit } from '@angular/core';
import { FormControlName, AbstractControl } from '@angular/forms';
import { MatFormField } from '@angular/material';

@Component({
  selector: 'cs-form-control-error',
  templateUrl: './form-control-error.component.html',
  styleUrls: ['./form-control-error.component.less']
})
export class FormControlErrorComponent implements OnInit {
  private control: AbstractControl;
  @Input('messageMap') private _messageMap: {[errorCode: string]: string};

  constructor(
    @Optional() private formControlName: FormControlName,
    @Optional() private matInputContainer: MatFormField
  ) {
    if(!this.matInputContainer && !this.formControlName){
      throw new Error(
        'FormControlErrorDirective cannot be used without MatFormField or FormControlName'
      );
    }

    this._messageMap = {};
  }

  get messageMap() { return this._messageMap; }

  ngOnInit(){
    if(this.matInputContainer){
      //this.control = this.matInputContainer._matInputChild._ngControl.control;
      this.control = this.matInputContainer._control.ngControl.control;
    } else{
      this.control = this.formControlName.control;
    }
  }

  private entryError() {
    let entryError: {errorCode: string, error: any} = {
      errorCode: null,
      error: null
    }
    if(this.control.invalid){
      entryError.errorCode = Object.keys(this.control.errors)[0];
      entryError.error = this.control.errors[entryError.errorCode];
    }

    return entryError;
  }

  get errorCode() { return this.entryError().errorCode; }
  get error() { return this.entryError().error; }
  get defaultMessage() {
    let message = '';
    let entryError =  this.entryError();

    if(entryError.errorCode !== null){
      if(this.messageMap[entryError.errorCode]){
        message = this.messageMap[entryError.errorCode];
      } else if(typeof entryError.error === 'object'){
        let messages = [];
        Object.keys(entryError.error).forEach((key) => {
          messages.push(`${key}: ${entryError.error[key]}`);
        });
        message = messages.join(' ,');
      } else{
        message = entryError.errorCode;
      }
    }

    return message;
  }
}
