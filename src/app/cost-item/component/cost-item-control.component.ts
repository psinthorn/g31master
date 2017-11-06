import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '@consol/account';

import { CostItem } from '../model';

import { CostItemService } from '../cost-item.service';

export const csCostItemControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CostItemControlComponent),
  multi: true,
};

export const csCostItemControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CostItemControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-cost-item-control',
  templateUrl: '../template/cost-item-control/cost-item-control.component.html',
  styleUrls: [ '../template/cost-item-control/cost-item-control.component.less' ],
  providers: [
    csCostItemControlValueAccessor,
    csCostItemControlValidators,
  ],
})
export class CostItemControlComponent extends AccountSearchableControl<CostItem> {
  constructor(
    ds: CostItemService,
  ) {
    super(ds);
  }
}
