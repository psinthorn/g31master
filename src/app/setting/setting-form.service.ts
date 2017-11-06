import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { Setting } from './model';

import { DocumentFormService } from '@consol/document';

@Injectable()
export class SettingFormService extends FormService<Setting> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item: Setting): {[name: string]: any} {
    item = item || new Setting();

    return {
      id: [item.id || null, []],
      code: [item.code || null, [Validators.required]],
      name: [item.name || null, [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
