import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountArrayControlBase } from './account-control.base-component';

import { Account } from '../model';

import { AccountService } from '../account.service';

export const CS_ACCOUNT_ARRAY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AccountArrayControlComponent),
  multi: true,
};

export const CS_ACCOUNT_ARRAY_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AccountArrayControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-account-array-control',
  templateUrl: './account-array-control.component.html',
  styleUrls: [ './account-control.component.less' ],
  providers: [
    CS_ACCOUNT_ARRAY_CONTROL_VALUE_ACCESSOR,
    CS_ACCOUNT_ARRAY_CONTROL_VALIDATORS,
  ],
})
export class AccountArrayControlComponent
  extends AccountArrayControlBase<Account> { }
