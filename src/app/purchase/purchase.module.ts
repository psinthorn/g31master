import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { DocumentModule } from '@consol/document';
import { VendorModule } from '@consol/vendor';
import { ProjectModule, ProjectBoqModule } from '@consol/project';
import { EmployeeModule } from '@consol/employee';
import { CostItemModule } from '@consol/cost-item';

import { PurchaseFormService } from './purchase-form.service';
import { PurchaseDetailFormService } from './purchase-detail-form.service';

//import { DocumentControlComponent } from './vendor-control.component';

/*
import {
  PurchaseRequestListComponent,
  PurchaseRequestItemComponent, PurchaseRequestItemViewComponent, PurchaseRequestItemReplaceComponent,
} from './component';
*/

@NgModule({
  imports: [
    RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
    DocumentModule,
    ProjectModule, ProjectBoqModule,
    VendorModule,
    EmployeeModule,
    CostItemModule,
  ],
  exports: [
  ],
  declarations: [
  ],
  providers: [
    PurchaseFormService, PurchaseDetailFormService,
    //PurchaseService,
  ],
})
export class PurchaseModule { }
