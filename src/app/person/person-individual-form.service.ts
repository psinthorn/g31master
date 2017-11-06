import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { PersonIndividual } from './model';

import { PersonFormService } from './person-form.service';

import {
  CitizenFormService,
  ContactFormService
} from '@consol/custom';
import { AccountFormService } from '@consol/account';

@Injectable()
export class PersonIndividualFormService extends FormService<PersonIndividual> {
  constructor(
    fb: FormBuilder,
    private personFormService: PersonFormService,
    private citizenFormService: CitizenFormService,
  ) {
    super(fb);
  }

  formConfig(item?: PersonIndividual): {[name: string]: any} {
		item = item || new PersonIndividual();

    return Object.assign(this.personFormService.formConfig(item), {
      personData: this.citizenFormService.formBuild(item.personData),
      phone: [item.phone || null, []],
      fax: [item.fax || null, []],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.personFormService.formAssignChanges(formGroup);
    this.citizenFormService.formAssignChanges(formGroup.get('personData') as FormGroup);

    return formGroup;
  }
}
