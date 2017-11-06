import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { SettingTax } from '../model';

import { SettingFormService } from '../setting-form.service';

@Injectable()
export class SettingTaxFormService extends FormService<SettingTax> {
  constructor(
    fb: FormBuilder,
    private settingFormService: SettingFormService,
  ) {
    super(fb);
  }

  formConfig(item?: SettingTax): {[name: string]: any} {
    item = item || new SettingTax();

    return Object.assign(this.settingFormService.formConfig(item), {
      taxs: this.fb.array((item.taxs || [null]).map((data) => {
        return this.createItem(data);
      })),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }

  createItem(value?): FormControl {
    return this.fb.control((value === 0)? 0 : (value || null), [Validators.required])
  }
}
