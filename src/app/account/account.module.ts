import { NgModule } from '@angular/core';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { I3eModule } from '@i3e';

import { AccountFormService } from './account-form.service';
import { AccountService } from './account.service';

import {
  AccountControlComponent, AccountArrayControlComponent,
} from './component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    //AccountMaterialModule, // must be specific later, now use from SharedModule
    CustomModule,
  ],
  exports: [
    AccountControlComponent,
    AccountArrayControlComponent,
  ],
  declarations: [
    AccountControlComponent,
    AccountArrayControlComponent,
  ],
  providers: [ AccountFormService, AccountService ],
})
export class AccountModule { }
