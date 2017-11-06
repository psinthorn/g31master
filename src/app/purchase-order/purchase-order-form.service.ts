import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

// RxJS operator
import 'rxjs/add/operator/debounceTime';

import { FormService } from '@i3e/form-service';

import { PurchaseOrder, PurchaseOrderDetail } from './model';

import { PurchaseFormService } from '@consol/purchase';

import {
  PurchaseOrderDetailFormService,
} from './purchase-order-detail-form.service';

@Injectable()
export class PurchaseOrderFormService extends FormService<PurchaseOrder> {
  constructor(
    fb: FormBuilder,
    private purchaseFormService: PurchaseFormService<PurchaseOrderDetail>,
    private purchaseOrderDetailFormService: PurchaseOrderDetailFormService,
  ) {
    super(fb);
  }

  formConfig(item: PurchaseOrder): {[name: string]: any} {
    item = item || new PurchaseOrder();

    return Object.assign(this.purchaseFormService.formConfig(item), {
      discount: [item.discount || '0.00'],
      costItemTotal: [item.costItemTotal || '0.00'],
      vatFactor: [item.vatFactor || null, [Validators.required]],
      vatIncluded: [item.vatIncluded || null, (item.vatFactor === true)? [Validators.required] : []],
      vat: [item.vat || null],
      vatCost: [item.vatCost || '0.00'],
      excludeVat: [item.excludeVat || '0.00', [Validators.required]],
      docTotal: [item.docTotal || null],
      taxFactor: [item.taxFactor || null],
      tax: [item.tax || null, [Validators.required]],
      taxCost: [item.taxCost || null],
      payTotal: [item.payTotal || null],
      details: this.fb.array((item.details || [null]).map((data) => {
        return this.purchaseOrderDetailFormService.formBuild(data);
      }), Validators.required),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.purchaseFormService.formAssignChanges(formGroup);

    (formGroup.get('details') as FormArray).controls.forEach((fg: FormGroup) => {
      this.purchaseOrderDetailFormService.formAssignChanges(fg);
    });

    Observable.merge(
      formGroup.get('discount').valueChanges,
      formGroup.get('total').valueChanges
    ).debounceTime(100).subscribe(() => {
      const discount = +formGroup.get('discount').value;
      const total = +formGroup.get('total').value;

      formGroup.get('costItemTotal').setValue((total - discount).toFixed(2));
    });

    Observable.merge(
      formGroup.get('costItemTotal').valueChanges,
      formGroup.get('vatFactor').valueChanges,
      formGroup.get('vatIncluded').valueChanges,
      formGroup.get('vat').valueChanges,
    ).debounceTime(100).subscribe(() => {
      const costItemTotal = +formGroup.get('costItemTotal').value;
      const vatFactor = formGroup.get('vatFactor').value;
      const vatIncluded = formGroup.get('vatIncluded').value;
      const vat = +formGroup.get('vat').value * (+vatFactor);
      let vatCost: number;
      let total: number;
      let docTotal: number;

      if(vatFactor === true) {
        formGroup.get('vatIncluded').setValidators(Validators.required);
      } else {
        formGroup.get('vatIncluded').clearValidators();
      }

      if((vatFactor === null) || (vatFactor && (vatIncluded === null))) {
        formGroup.get('vatCost').setValue(null);
        formGroup.get('docTotal').setValue(null);
        formGroup.get('excludeVat').setValue(null);
      } else {
        if(vatIncluded) {
          const t2 = Math.floor(costItemTotal * (100/(100 + vat)) * 100)/100;
          vatCost = costItemTotal - t2;
          docTotal = costItemTotal;
        } else {
          vatCost = Math.ceil(costItemTotal * vat)/100;
          docTotal = costItemTotal + vatCost;
        }

        formGroup.get('vatCost').setValue(vatCost.toFixed(2));
        formGroup.get('docTotal').setValue(docTotal.toFixed(2));
        formGroup.get('excludeVat').setValue((docTotal - vatCost).toFixed(2));
      }
    });

    Observable.merge(
      formGroup.get('excludeVat').valueChanges,
      formGroup.get('vatCost').valueChanges,
      formGroup.get('taxFactor').valueChanges,
      formGroup.get('tax').valueChanges,
    ).debounceTime(100).subscribe(() => {
      const excludeVatRaw = formGroup.get('excludeVat').value;
      const vatCostRaw = formGroup.get('vatCost').value;
      const taxFactor = formGroup.get('taxFactor').value;
      const taxRaw = formGroup.get('tax').value;

      if(taxFactor === true) {
        formGroup.get('tax').setValidators(Validators.required);
      } else {
        formGroup.get('tax').clearValidators();
      }

      if((excludeVatRaw === null) || (vatCostRaw === null) || (taxFactor === null) || (taxFactor && (taxRaw === null))) {
        formGroup.get('taxCost').setValue(null);
        formGroup.get('payTotal').setValue(null);
      } else {
        const excludeVat = +excludeVatRaw;
        const vatCost = +vatCostRaw;

        const tax = +taxRaw * (+taxFactor);
        const taxCost = Math.ceil(excludeVat * tax)/100;

        formGroup.get('taxCost').setValue(taxCost.toFixed(2));
        formGroup.get('payTotal').setValue((excludeVat - taxCost + vatCost).toFixed(2));
      }
    });

    return formGroup;
  }

  createDetail(detail?: PurchaseOrderDetail) {
    return this.purchaseOrderDetailFormService.formCreate(detail);
  }
}
