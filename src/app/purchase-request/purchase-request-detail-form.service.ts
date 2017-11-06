import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

import { FormService } from '@i3e/form-service';

import { PurchaseRequestDetail } from './model';

import { PurchaseDetailFormService } from '@consol/purchase';

@Injectable()
export class PurchaseRequestDetailFormService extends FormService<PurchaseRequestDetail> {
  constructor(
    fb: FormBuilder,
    private purchaseDetailFormService: PurchaseDetailFormService,
  ) {
    super(fb);
  }

  formConfig(item?: PurchaseRequestDetail): {[name: string]: any} {
    item = item || new PurchaseRequestDetail();

    return Object.assign(this.purchaseDetailFormService.formConfig(item), {
      costItem: [item.costItem || null, []],
      _costItem: [item.costItem || item.name || null , [Validators.required]],
      name: [item.name || null, [Validators.required]],
      unit: [item.unit || null, [Validators.required]],
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.purchaseDetailFormService.formAssignChanges(formGroup);

    formGroup.get('_costItem').valueChanges.subscribe((value) => {
      if((value !== null) && (typeof value === 'object')) {
        formGroup.get('costItem').setValue(value);
        formGroup.get('name').setValue(value.name);
        formGroup.get('unit').setValue(value.unit);
        formGroup.get('price').setValue(value.price);
      } else {
        formGroup.get('costItem').setValue(null);
        formGroup.get('name').setValue(value);
      }
    });

    formGroup.get('unit').valueChanges.subscribe((value) => {
      let costItemControl = formGroup.get('costItem');
      if(costItemControl.value && (costItemControl.value.unit !== value)) {
        costItemControl.setValue(null);
      }
    });

    return formGroup;
  }
}
