import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountControlBase } from '@consol/account';

import { Vendor } from './model';

import { VendorService } from './vendor.service';

export const CS_VENDOR_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => VendorControlComponent),
  multi: true,
};

export const CS_VENDOR_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => VendorControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-vendor-control',
  templateUrl: './vendor-control.component.html',
  styleUrls: [ './vendor-control.component.less' ],
  providers: [
    CS_VENDOR_CONTROL_VALUE_ACCESSOR,
    CS_VENDOR_CONTROL_VALIDATORS,
  ],
})
export class VendorControlComponent extends AccountControlBase<Vendor> {
  constructor(
    ds: VendorService,
  ) {
    super(ds);
  }
}
