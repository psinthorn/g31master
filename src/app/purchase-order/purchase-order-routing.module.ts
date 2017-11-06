import { NgModule }             from '@angular/core';
import { I3eModule } from '@i3e';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { DocumentModule } from '@consol/document';
import { TerminatedDocumentRoutingModule } from '@consol/document';

import { PurchaseOrderModule } from './purchase-order.module';

//import { VendorModule } from '@consol/vendor/vendor.module';

import {
  PurchaseOrderRoutingComponent,
  PurchaseOrderListRoutingComponent,
  PurchaseOrderItemRoutingComponent, PurchaseOrderItemViewRoutingComponent, PurchaseOrderItemReplaceRoutingComponent,
  PurchaseRequestRemainListRoutingComponent, PurchaseOrderFromPurchaseRequestItemRoutingComponent,
  //PurchaseOrderItemCancelRoutingComponent, PurchaseOrderItemRejectRoutingComponent,
} from './purchase-order-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    DocumentModule,
    PurchaseOrderModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    //VendorModule,

    RouterModule.forChild([
      { path: '', component: PurchaseOrderRoutingComponent,
        children: [
          { path: '', component: PurchaseOrderListRoutingComponent },
          { path: 'add', component: PurchaseOrderItemRoutingComponent,
            children: [
              { path: '', component: PurchaseRequestRemainListRoutingComponent, data: {label: 'Purchase Request(Remain)'} },
              { path: 'new', component: PurchaseOrderItemReplaceRoutingComponent, data: {label: 'Purchase Order (New)'} },
              { path: ':id', component: PurchaseOrderFromPurchaseRequestItemRoutingComponent,
                children: [
                  { path: '', component: PurchaseOrderItemReplaceRoutingComponent, data: {label: 'Purchase Order (Form Purchase Request)' } },
                ],
              },
            ]
          },
          { path: ':id', component: PurchaseOrderItemRoutingComponent,
            children: [
              { path: '', component: PurchaseOrderItemViewRoutingComponent, data: {label: 'Purchase Order (View)' } },
              { path: 'replace', component: PurchaseOrderItemReplaceRoutingComponent, data: {label: 'Purchase Order (Replace)'} },
              { path: '', loadChildren: '@consol/document#TerminatedDocumentRoutingModule' },
            ],
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    PurchaseOrderRoutingComponent,
    PurchaseOrderListRoutingComponent,
    PurchaseOrderItemRoutingComponent, PurchaseOrderItemViewRoutingComponent, PurchaseOrderItemReplaceRoutingComponent,
    PurchaseRequestRemainListRoutingComponent, PurchaseOrderFromPurchaseRequestItemRoutingComponent,
    //PurchaseOrderItemCancelRoutingComponent, PurchaseOrderItemRejectRoutingComponent,
  ],
})
export class PurchaseOrderRoutingModule {}
