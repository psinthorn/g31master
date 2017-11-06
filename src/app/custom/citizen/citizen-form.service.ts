import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

/// RxJS static methods
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { Citizen } from '../model';

import { PersonDataFormService } from '../person-data';

@Injectable()
export class CitizenFormService extends FormService<Citizen> {
  constructor(
    fb: FormBuilder,
    private personDataFormService: PersonDataFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Citizen): {[name: string]: any}{
    item = item || new Citizen();

    return Object.assign(this.personDataFormService.formConfig(item), {
      initname: [item.initname || null, [Validators.required]],
      firstname: [item.firstname || null, [Validators.required]],
      lastname: [item.lastname || null, [Validators.required]],
      birthDate: [item.birthDate || null, []],
      religious: [item.religious || null, []],
      issueDate: [item.issueDate || null, [Validators.required]],
      expiredDate: [item.expiredDate || null, [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.personDataFormService.formAssignChanges(formGroup);

    Observable.merge(
      formGroup.get('initname').valueChanges,
      formGroup.get('firstname').valueChanges,
      formGroup.get('lastname').valueChanges,
    ).subscribe(() => {
      const initname = formGroup.get('initname').value;
      const firstname = formGroup.get('firstname').value;
      const lastname = formGroup.get('lastname').value;
      formGroup.get('name').setValue(`${initname}${firstname} ${lastname}`.trim());
    });

    return formGroup;
  }
}
