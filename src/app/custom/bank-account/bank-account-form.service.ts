import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { BankAccount } from '../model';

@Injectable()
export class BankAccountFormService extends FormService<BankAccount> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: BankAccount): {[name: string]: any} {
    item = item || new BankAccount();

    return {
      id: [item.id || null, []],
      code: [item.code || null, [Validators.required]],
      name: [item.name || null, [Validators.required]],
      category: [item.category || null, [Validators.required]],
      bank: [item.bank || null, [Validators.required]],
      branch: [item.branch || null, [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
