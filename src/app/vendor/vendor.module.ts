import { NgModule } from '@angular/core';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { AccountModule } from '@consol/account';

import { VendorFormService } from './vendor-form.service';
import { VendorService } from './vendor.service';

import { VendorControlComponent } from './vendor-control.component';

@NgModule({
  imports: [
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
    AccountModule,
  ],
  exports: [
    VendorControlComponent,
  ],
  declarations: [
    VendorControlComponent,
  ],
  providers: [
    VendorFormService,
    VendorService,
  ],
})
export class VendorModule { }
