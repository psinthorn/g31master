import { Component, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'cs-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.less']
})
export class ErrorMessageComponent {
  @Input('messageMap') private _messageMap: {[errorCode: string]: string};

  constructor(
    private control: NgControl,
  ) {
    this._messageMap = {};
  }

  get messageMap() { return this._messageMap; }

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
