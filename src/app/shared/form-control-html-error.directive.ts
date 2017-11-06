import { Directive, Optional, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatInput } from '@angular/material';

@Directive({
  selector: '[formControlHtmlError]',
  host: {
    '[attr.required]': 'required || null',
  },
})
export class FormControlHtmlErrorDirective {
  private _required: boolean;

  constructor(
    private control: NgControl,
    @Optional() private matInput: MatInput,
  ) {
    this._required = false;
  }

  get required() { return this._required; }

  private updateError() {
    let required = this.control.errors && this.control.errors.required || null;

    this._required = !!required;

    if(this.matInput) {
      this.matInput.required = this.required;
    }
  }

  ngOnInit() {
    this.updateError();
    this.control.statusChanges.subscribe(() => this.updateError());
  }
}
