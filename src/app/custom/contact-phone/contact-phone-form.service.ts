import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { ContactPhone } from '../model';

@Injectable()
export class ContactPhoneFormService extends FormService<ContactPhone> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: ContactPhone): {[name: string]: any} {
    item = item || new ContactPhone();

    return {
      id: [item.id || null, []],
      phone: [item.phone || null, [Validators.required]],
      default: [item.default || false, [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
