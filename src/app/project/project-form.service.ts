import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Project } from './model';

import {
  AddressFormService,
  ContactFormService,
} from '@consol/custom';

import { AccountFormService } from '@consol/account';

@Injectable()
export class ProjectFormService extends FormService<Project> {
  constructor(
    fb: FormBuilder,
    private accountFormService: AccountFormService,
    private addressFormService: AddressFormService,
    private contactFormService: ContactFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Project): {[name: string]: any} {
    item = item || new Project();

    return Object.assign(this.accountFormService.formConfig(item), {
      owner: [item.owner || null, [Validators.required]],
      address: this.addressFormService.formBuild(item.address),
      contacts: this.fb.array((item.contacts || []).map((data) => {
        return this.contactFormService.formBuild(data);
      })),
      bankAccounts: [item.bankAccounts || [], []],
      workers: [item.workers || [], [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.accountFormService.formAssignChanges(formGroup);
    this.addressFormService.formAssignChanges(formGroup.get('addresss') as FormGroup);
    (formGroup.get('contacts') as FormArray).controls.forEach((fg: FormGroup) => {
      this.contactFormService.formAssignChanges(fg);
    });

    return formGroup;
  }
}
