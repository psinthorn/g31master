import { Component, Self } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';

import { BankAccountFormService } from './bank-account-form.service';

@Component({
  selector: 'cs-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.less']
})
export class BankAccountComponent {
  constructor(@Self() private _controlContainer: ControlContainer) { }

  get formGroup() { return this._controlContainer.control; }
}

@Component({
  selector: 'cs-bank-account-array',
  templateUrl: './bank-account-array.component.html',
  styleUrls: ['./bank-account-array.component.less']
})
export class BankAccountArrayComponent {
  private _createItem: () => FormGroup;
  constructor(
    private bankAccountFormService: BankAccountFormService,
    @Self() private controlContainer: ControlContainer
  ) {
    this._createItem = () => this.bankAccountFormService.formCreate();
  }

  get createItem() { return this._createItem; }
  get formArray() { return this.controlContainer.control as FormArray; }
}
