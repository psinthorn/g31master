import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { PurchaseDetail } from './model';

import { DocumentFormService } from '@consol/document';

@Injectable()
export class PurchaseDetailFormService extends FormService<PurchaseDetail> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: PurchaseDetail): {[name: string]: any} {
    item = item || new PurchaseDetail();

    return {
      id: [item.id || null, []],
      costItem: [item.costItem || null, [Validators.required]],
      price: [item.price || null, [Validators.required]],
      boqData: [item.boqData || null, [Validators.required]],
      quantity: [item.quantity || null, [Validators.required]],
      _total: [((item.price || 0) * (item.quantity || 0)).toFixed(2), []],
      remark: [item.remark || '-', [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    Observable.merge(
      formGroup.get('price').valueChanges,
      formGroup.get('quantity').valueChanges,
    ).subscribe((value) => {
      formGroup.get('_total').setValue(this.calculateTotal(formGroup.value).toFixed(2));
    });

    return formGroup;
  }

  calculateTotal(detail: PurchaseDetail): number {
    return (detail.price || 0) * (detail.quantity || 0);
  }
}
