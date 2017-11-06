import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Contact } from '../model';

import { ContactPhoneFormService } from '../contact-phone';

@Injectable()
export class ContactFormService extends FormService<Contact> {
  constructor(
    fb: FormBuilder,
    private contactPhoneFormService: ContactPhoneFormService
  ) {
    super(fb);
  }

  formConfig(item?: Contact): {[name: string]: any} {
    item = item || new Contact();

    return {
      id: [item.id || null, []],
      alias: [item.alias || null, [Validators.required]],
      position: [item.position || null, []],
      email: [item.email || null, []],
      lineId: [item.lineId || null, []],
      phones: this.fb.array((item.phones || [null]).map((data) => {
        return this.contactPhoneFormService.formBuild(data);
      }), Validators.required),
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
