import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '../account-control';

import { Account } from '../model';

import { AccountService } from '../account.service';

export const csAccountControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AccountControlComponent),
  multi: true,
};

export const csAccountControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => AccountControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-account-control',
  templateUrl: './account-control.component.html',
  styleUrls: [ './account-control.component.less' ],
  providers: [
    csAccountControlValueAccessor,
    csAccountControlValidators,
  ],
})
export class AccountControlComponent extends AccountSearchableControl<Account> {
  constructor(
    ds: AccountService,
  ) {
    super(ds);
  }
}
