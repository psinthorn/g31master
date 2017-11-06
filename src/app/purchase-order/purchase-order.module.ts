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

import { PurchaseRequestModule } from '@consol/purchase-request';
import { SettingModule } from '@consol/setting';

import { PurchaseRequestDetailStatusChangedFormService } from './purchase-request-detail-status-changed-form.service';
import { PurchaseOrderDetailFormService } from './purchase-order-detail-form.service';
import { PurchaseOrderFormService } from './purchase-order-form.service';

import { PurchaseOrderService } from './purchase-order.service';

import {
  PurchaseRequestRemainListRoutingLoaderDirective,
  PurchaseOrderFromPurchaseRequestItemRoutingLoaderDirective,
} from './data-loader';

import {
  PurchaseOrderListComponent,
  PurchaseOrderItemComponent, PurchaseOrderItemViewComponent, PurchaseOrderItemReplaceComponent,
  PurchaseRequestRemainListComponent,
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
    PurchaseRequestModule,
    SettingModule,
  ],
  exports: [
    PurchaseOrderListComponent,
    PurchaseOrderItemComponent, PurchaseOrderItemViewComponent, PurchaseOrderItemReplaceComponent,
    PurchaseRequestRemainListComponent,

    PurchaseRequestRemainListRoutingLoaderDirective,
    PurchaseOrderFromPurchaseRequestItemRoutingLoaderDirective,
  ],
  declarations: [
    PurchaseOrderListComponent,
    PurchaseOrderItemComponent, PurchaseOrderItemViewComponent, PurchaseOrderItemReplaceComponent,
    PurchaseRequestRemainListComponent,

    PurchaseRequestRemainListRoutingLoaderDirective,
    PurchaseOrderFromPurchaseRequestItemRoutingLoaderDirective,
  ],
  providers: [
    PurchaseRequestDetailStatusChangedFormService, PurchaseOrderDetailFormService, PurchaseOrderFormService,
    PurchaseOrderService,
  ],
})
export class PurchaseOrderModule { }
