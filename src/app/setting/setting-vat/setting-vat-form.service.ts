import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { SettingVat } from '../model';

import { SettingFormService } from '../setting-form.service';

@Injectable()
export class SettingVatFormService extends FormService<SettingVat> {
  constructor(
    fb: FormBuilder,
    private settingFormService: SettingFormService,
  ) {
    super(fb);
  }

  formConfig(item?: SettingVat): {[name: string]: any} {
    item = item || new SettingVat();

    return Object.assign(this.settingFormService.formConfig(item), {
      vat: [(item.vat === 0)? 0 : (item.vat || null), [Validators.required]],
    })
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
