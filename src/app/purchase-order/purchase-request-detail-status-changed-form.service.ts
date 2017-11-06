import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { PurchaseRequestDetailStatusChanged } from './model';

@Injectable()
export class PurchaseRequestDetailStatusChangedFormService extends FormService<PurchaseRequestDetailStatusChanged> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: PurchaseRequestDetailStatusChanged): {[name: string]: any} {
    item = item || new PurchaseRequestDetailStatusChanged();

    return {
      id: [item.id || null, []],
      purchaseRequestDetail: [item.purchaseRequestDetail || null, []],
      removed: [item.removed || false, []],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
