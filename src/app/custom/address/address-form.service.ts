import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Address } from '../model';

@Injectable()
export class AddressFormService extends FormService<Address> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: Address): {[name: string]: any} {
    item = item || new Address();

    return {
      id: [item.id || null, []],
      address: [item.address || null, [Validators.required]],
      subdistrict: [item.subdistrict || null, [Validators.required]],
      district: [item.district || null, [Validators.required]],
      province: [item.province || null, [Validators.required]],
      postalcode: [item.postalcode || null, [
        Validators.pattern(/^\d*$/),
        Validators.maxLength(5),
      ]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
