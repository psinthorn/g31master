import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Vendor } from './model';

import { AccountFormService } from '@consol/account';

@Injectable()
export class VendorFormService extends FormService<Vendor> {
  constructor(
    fb: FormBuilder,
    private accountFormService: AccountFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Vendor): {[name: string]: any} {
    item = item || new Vendor();

    return Object.assign(this.accountFormService.formConfig(item), {
      owner: [item.owner || null, [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.accountFormService.formAssignChanges(formGroup);

    formGroup.get('owner').valueChanges.subscribe((value) => {
      formGroup.get('name').setValue(value && value.name);
    });

    return formGroup;
  }
}
