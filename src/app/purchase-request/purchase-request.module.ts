import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { PurchaseModule } from '@consol/purchase';
import { VendorModule } from '@consol/vendor';
import { ProjectModule, ProjectBoqModule } from '@consol/project';
import { EmployeeModule } from '@consol/employee';
import { CostItemModule } from '@consol/cost-item';

import { PurchaseRequestFormService } from './purchase-request-form.service';
import { PurchaseRequestDetailFormService } from './purchase-request-detail-form.service';
import { PurchaseRequestService } from './purchase-request.service';

//import { DocumentControlComponent } from './vendor-control.component';

import {
  PurchaseRequestListComponent,
  PurchaseRequestItemComponent, PurchaseRequestItemViewComponent, PurchaseRequestItemReplaceComponent,
} from './component';

@NgModule({
  imports: [
    RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
    PurchaseModule,
    ProjectModule, ProjectBoqModule,
    VendorModule,
    EmployeeModule,
    CostItemModule,
  ],
  exports: [
    PurchaseRequestListComponent,
    PurchaseRequestItemComponent, PurchaseRequestItemViewComponent, PurchaseRequestItemReplaceComponent,
  ],
  declarations: [
    PurchaseRequestListComponent,
    PurchaseRequestItemComponent, PurchaseRequestItemViewComponent, PurchaseRequestItemReplaceComponent,
  ],
  providers: [
    PurchaseRequestFormService, PurchaseRequestDetailFormService,
    PurchaseRequestService,
  ],
})
export class PurchaseRequestModule { }
