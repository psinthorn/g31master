import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { CostItemTypeRef } from './model';

@Injectable()
export class CostItemTypeRefFormService extends FormService<CostItemTypeRef> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: CostItemTypeRef): {[name: string]: any} {
    item = item || new CostItemTypeRef();

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
