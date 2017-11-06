import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { PurchaseOrderDetail } from './model';

import { PurchaseDetailFormService } from '@consol/purchase';
import { PurchaseRequestDetailStatusChangedFormService } from './purchase-request-detail-status-changed-form.service';

@Injectable()
export class PurchaseOrderDetailFormService extends FormService<PurchaseOrderDetail> {
  constructor(
    fb: FormBuilder,
    private purchaseDetailFormService: PurchaseDetailFormService,
    private purchaseRequestDetailStatusChangedFormService: PurchaseRequestDetailStatusChangedFormService,
  ) {
    super(fb);
  }

  formConfig(item?: PurchaseOrderDetail): {[name: string]: any} {
    item = item || new PurchaseOrderDetail() as any;

    const isRemoved = item.statusChanged && item.statusChanged.removed;

    return Object.assign(this.purchaseDetailFormService.formConfig(item), {
      costItem: [item.costItem || null, (isRemoved)? [Validators.required] : []],
      _unit: [item.costItem && item.costItem.unit || null, (isRemoved)? [Validators.required] : []],
      statusChanged: this.purchaseRequestDetailStatusChangedFormService.formBuild(item.statusChanged),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.purchaseDetailFormService.formAssignChanges(formGroup);
    this.purchaseRequestDetailStatusChangedFormService.formAssignChanges(formGroup.get('statusChanged') as FormGroup);

    formGroup.get('costItem').valueChanges.subscribe((value) => {
      formGroup.get('_unit').setValue((value)? value.unit : null);
    });

    formGroup.get('statusChanged.removed').valueChanges.subscribe((value) => {
      const costItemControl = formGroup.get('costItem');
      const _unitControl = formGroup.get('_unit');
      if(value) {
        costItemControl.clearValidators();
        _unitControl.clearValidators();
      } else {
        costItemControl.setValidators(Validators.required);
        _unitControl.setValidators(Validators.required);
      }
      costItemControl.updateValueAndValidity();
      costItemControl.markAsTouched();
      _unitControl.updateValueAndValidity();
      _unitControl.markAsTouched();
    });

    return formGroup;
  }
}
