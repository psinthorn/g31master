import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Person } from './model';

import { BankAccount } from '@consol/custom';

import {
  PersonDataFormService,
  AddressFormService,
  ContactFormService,
  BankAccountFormService,
} from '@consol/custom';
import { AccountFormService } from '@consol/account';

@Injectable()
export class PersonFormService extends FormService<Person> {
  constructor(
    fb: FormBuilder,
    private accountFormService: AccountFormService,
    private personDataFormService: PersonDataFormService,
    private addressFormService: AddressFormService,
    private contactFormService: ContactFormService,
    private bankAccountFormService: BankAccountFormService
  ) {
    super(fb);
  }

  formConfig(item?: Person): {[name: string]: any} {
    item = item || new Person();

    return Object.assign(this.accountFormService.formConfig(item), {
      personData: this.personDataFormService.formCreate(item.personData),
      address: this.addressFormService.formCreate(item.address),
      contact: this.contactFormService.formCreate(item.contact),
      bankAccounts: this.fb.array((item.bankAccounts || []).map((data) => {
        return this.bankAccountFormService.formCreate(data);
      })),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.accountFormService.formAssignChanges(formGroup);
    this.personDataFormService.formAssignChanges(formGroup.get('personData') as FormGroup);
    this.addressFormService.formAssignChanges(formGroup.get('address') as FormGroup);
    this.contactFormService.formAssignChanges(formGroup.get('contact') as FormGroup);
    (formGroup.get('bankAccounts') as FormArray).controls.forEach((fg: FormGroup) => {
      this.bankAccountFormService.formAssignChanges(fg);
    });

    formGroup.get('personData.name').valueChanges.subscribe((value) => {
      formGroup.get('name').setValue(value);
    });

    return formGroup;
  }
}
