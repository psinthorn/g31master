import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Employee } from './model';

import { AccountFormService } from '@consol/account';

@Injectable()
export class EmployeeFormService extends FormService<Employee> {
  constructor(
    fb: FormBuilder,
    private accountFormService: AccountFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Employee): {[name: string]: any} {
    item = item || new Employee();

    return Object.assign(this.accountFormService.formConfig(item), {
      individual: [item.individual, [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.accountFormService.formAssignChanges(formGroup);

    formGroup.get('individual').valueChanges.subscribe((value) => {
      formGroup.get('name').setValue(value && value.name);
    });

    return formGroup;
  }
}
