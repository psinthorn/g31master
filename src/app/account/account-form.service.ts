import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Account } from './model';

@Injectable()
export class AccountFormService extends FormService<Account> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: Account): {[name: string]: any} {
    item = item || new Account();

    return {
      id: [item.id || null, []],
      code: [item.code || '<NEW>', [Validators.required]],
      name: [item.name || null, [Validators.required]],
      remark: [item.remark || null, []],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
