import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { PersonCorporate } from './model';

import {
  CorporateFormService,
  ContactFormService
} from '@consol/custom';

import { AccountFormService } from '@consol/account';

import { PersonFormService } from './person-form.service';

@Injectable()
export class PersonCorporateFormService extends FormService<PersonCorporate> {
  constructor(
    fb: FormBuilder,
    private personFormService: PersonFormService,
    private corporateFormService: CorporateFormService,
    private contactFormService: ContactFormService,
  ) {
    super(fb);
  }

  formConfig(item?: PersonCorporate): {[name: string]: any} {
    item = item || new PersonCorporate();

    return Object.assign(this.personFormService.formConfig(item), {
      personData: this.corporateFormService.formBuild(item.personData),
      phone: [item.phone || null, []],
      fax: [item.fax || null, []],
      contacts: this.fb.array((item.contacts || [null]).map((data) => {
        return this.contactFormService.formBuild(data);
      }), Validators.required),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.personFormService.formAssignChanges(formGroup);
    this.corporateFormService.formAssignChanges(formGroup.get('personData') as FormGroup);
    (formGroup.get('contacts') as FormArray).controls.forEach((fg: FormGroup) => {
      this.contactFormService.formAssignChanges(fg);
    });

    formGroup.get('contacts').valueChanges.subscribe((value) => {
      if(value && (typeof value[0] !== 'undefined')){
        formGroup.get('contact').setValue(value[0]);
      } else {
        formGroup.get('contact').setValue(null);
      }
    });

    return formGroup;
  }
}
