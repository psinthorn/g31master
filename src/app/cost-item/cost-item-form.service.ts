import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { CostItem } from './model';

import { AccountFormService } from '@consol/account';

const codePrefix = 'CI';

@Injectable()
export class CostItemFormService extends FormService<CostItem> {
  constructor(
    fb: FormBuilder,
    private accountFormService: AccountFormService,
  ) {
    super(fb);
  }

  formConfig(item?: CostItem): {[name: string]: any} {
    item = item || new CostItem();

    return Object.assign(this.accountFormService.formConfig(item), {
      _code: [this.removePrefix(item.code) || null, [Validators.required]],
      type: [item.type || null, [Validators.required]],
      unit: [item.unit || null, [Validators.required]],
      price: [item.price || null, [Validators.required]],
      description: [item.description || null, [Validators.required]],
    });
  }

  removePrefix(value: string): string {
    return value && value.substring(codePrefix.length);
  }

  addPrefix(value: string): string {
    return `${codePrefix}${value}`;
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.accountFormService.formAssignChanges(formGroup);

    formGroup.get('_code').valueChanges.subscribe((value) => {
      const oldValue = formGroup.get('code').value;
      const newValue = this.addPrefix(value);
      if(oldValue !== newValue)
        formGroup.get('code').setValue(newValue);
    });

    formGroup.get('code').valueChanges.subscribe((value) => {
      const oldValue = formGroup.get('_code').value;
      const newValue = this.removePrefix(value);
      if(oldValue !== newValue)
        formGroup.get('_code').setValue(newValue);
    });

    return formGroup;
  }
}
