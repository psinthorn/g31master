import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { PurchaseRequest, PurchaseRequestDetail } from './model';

import { PurchaseFormService } from '@consol/purchase';

import {
  PurchaseRequestDetailFormService,
} from './purchase-request-detail-form.service';

@Injectable()
export class PurchaseRequestFormService extends FormService<PurchaseRequest> {
  constructor(
    fb: FormBuilder,
    private purchaseFormService: PurchaseFormService<PurchaseRequestDetail>,
    private purchaseRequestDetailFormService: PurchaseRequestDetailFormService,
  ) {
    super(fb);
  }

  formConfig(item: PurchaseRequest): {[name: string]: any} {
    item = item || new PurchaseRequest();

    return Object.assign(this.purchaseFormService.formConfig(item), {
      details: this.fb.array((item.details || [null]).map((data) => {
        return this.purchaseRequestDetailFormService.formBuild(data);
      }), Validators.required),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.purchaseFormService.formAssignChanges(formGroup);
    (formGroup.get('details') as FormArray).controls.forEach((fg: FormGroup) => {
      this.purchaseRequestDetailFormService.formAssignChanges(fg);
    });

    return formGroup;
  }

  createDetail(detail?: PurchaseRequestDetail) {
    return this.purchaseRequestDetailFormService.formCreate(detail);
  }
}
