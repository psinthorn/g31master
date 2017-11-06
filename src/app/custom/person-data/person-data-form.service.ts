import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { AddressFormService } from '../address/address-form.service';

import { PersonData } from '../model';

@Injectable()
export class PersonDataFormService extends FormService<PersonData> {
  constructor(
    fb: FormBuilder,
    private addressFormService: AddressFormService,
  ) {
    super(fb);
  }

  formConfig(item?: PersonData): {[name: string]: any} {
    item = item || new PersonData();

    return {
      id: [item.id || null, []],
      code: [item.code || null, [
        Validators.required,
        Validators.pattern(/^\d*$/),
      ]],
      name: [item.name || null, [Validators.required]],
      address: this.addressFormService.formBuild(item.address),
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
