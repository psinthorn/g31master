import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/merge';

// RxJS add operator
import 'rxjs/add/operator/debounceTime';

import { FormService } from '@i3e/form-service';

import { Purchase, PurchaseDetail } from './model';

import { DocumentFormService } from '@consol/document';

import { PurchaseDetailFormService } from './purchase-detail-form.service';

@Injectable()
export class PurchaseFormService<D extends PurchaseDetail> extends FormService<Purchase<D>> {
  constructor(
    fb: FormBuilder,
    private documentFormService: DocumentFormService,
    private purchaseDetailFormService: PurchaseDetailFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Purchase<D>): {[name: string]: any} {
    item = item || new Purchase<D>();

    return Object.assign(this.documentFormService.formConfig(item), {
      vendor: [item.vendor || null, []],
      vendorContactInformation: [item.vendorContactInformation || null, []],
      vendorAddress: [item.vendorAddress || null, []],
      project: [item.project || null, [Validators.required]],
      shippingAddress: [item.shippingAddress || null, [Validators.required]],
      requester: [item.requester || null, [Validators.required]],
      contactInformation: [item.contactInformation || null, [Validators.required]],
      wantedDate: [item.wantedDate || null, [Validators.required]],

      boq: [item.boq || null, [Validators.required]],
      budgetType: [item.budgetType || null, [Validators.required]],

      total: [item.total || '0.00', [Validators.required]],

      details: this.fb.array((item.details || [null]).map((data) => {
        return this.purchaseDetailFormService.formBuild(data);
      }), Validators.required),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.documentFormService.formAssignChanges(formGroup);
    (formGroup.get('details') as FormArray).controls.forEach((fg: FormGroup) => {
      this.purchaseDetailFormService.formAssignChanges(fg);
    });

    formGroup.get('details').valueChanges
      .debounceTime(100)
      .subscribe((details: PurchaseDetail[]) => {
        formGroup.get('total').setValue(this.calculateTotal(details).toFixed(2));
      })
    ;

    Observable.merge(
      formGroup.get('project').valueChanges,
      formGroup.get('vendor').valueChanges,
      formGroup.get('requester').valueChanges,
    ).subscribe(() => {
      const project = formGroup.get('project').value;
      const vendor = formGroup.get('vendor').value;
      const requester = formGroup.get('requester').value;
      formGroup.get('name').setValue(`${project}/${vendor}@${requester}`);
    });

    formGroup.get('vendor').valueChanges.subscribe((value) => {
      formGroup.get('vendorContactInformation').setValue((value)? `${ value.owner.contact }` : null);
      formGroup.get('vendorAddress').setValue((value)? `${ value.owner.address }` : null);
    });

    formGroup.get('project').valueChanges.subscribe((value) => {
      formGroup.get('shippingAddress').setValue((value)? `${ value.address }` : null);

      const projectBoq = formGroup.get('boq').value;
      if(projectBoq) {
        if(!value || (value.id !== projectBoq.project.id)) {
          formGroup.get('boq').setValue(null);
        }
      }
    });

    formGroup.get('requester').valueChanges.subscribe((value) => {
      formGroup.get('contactInformation').setValue((value)? `${value.individual.contact}` : null);
    });

    formGroup.get('boq').valueChanges.subscribe((value) => {
      const budgetType = formGroup.get('budgetType').value;
      if(budgetType) {
        let isMatch = false;
        if(value) {
          for(let allowedBudgetType of value.budgetTypes) {
            if(allowedBudgetType.id == budgetType.id) {
              isMatch = true;
              break;
            }
          }
        }

        if(!isMatch) formGroup.get('budgetType').setValue(null);
      }
    });

    return formGroup;
  }

  calculateTotal(details: PurchaseDetail[]): number {
    return details.reduce((result, detail: PurchaseDetail&{_total: number}) => result + (+detail._total), 0)
  }

  createDetail(detail?: D) {
    return this.purchaseDetailFormService.formCreate(detail);
  }
}
