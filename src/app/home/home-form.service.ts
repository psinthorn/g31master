import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { AddressFormService } from '@consol/custom';

import { Home, HomeDetail } from './model';

import { Vendor } from '@consol/vendor';

const serviceName: string = 'home';

@Injectable()
export class HomeFormService extends FormService<Home> {
  constructor(
    fb: FormBuilder,
    private addressFormService: AddressFormService
  ) {
    super(fb);
  }

  formConfig(item?: Home): {[name: string]: any} {
    let dummy = new Vendor();
    //let dummy = {code: null, name: null};
    dummy.code = 'V000';
    dummy.name = 'abcd';

    return {
      id: [item.id || null, []],
      code: [item.code || null, [<any>Validators.required]],
      firstname: [item.firstname || null, [<any>Validators.required]],
      lastname: [item.lastname || null, [<any>Validators.required]],
      address: [item.address || null, []],
      address2: [item.address2 || null, []],
      city: [item.city || null, [<any>Validators.required]],
      state: [item.state || null, [<any>Validators.required]],
      postalcode: [item.postalcode || null, [
        <any>Validators.required,
        <any>Validators.maxLength(5)
      ]],
      details: this.fb.array((item.details || [null]).map((detail) => {
        return this.itemCreateDetailForm(detail);
      })),
      addressEx: this.addressFormService.formCreate(item.addressEx),
      myTest: [dummy, []],

      parent: [item.parent || 'abacde', [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }

  itemCreateDetailForm(detail?: HomeDetail) {
    detail = detail || new HomeDetail();
    return this.fb.group({
      att1: [detail.att1, [<any>Validators.required]],
      att2: [detail.att2, [<any>Validators.required]],
    });
  }
}
