import { NgModule }             from '@angular/core';
import { I3eModule } from '@i3e';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { DocumentModule } from '@consol/document';
import { TerminatedDocumentRoutingModule } from '@consol/document';

import { PurchaseRequestModule } from './purchase-request.module';

//import { VendorModule } from '@consol/vendor/vendor.module';

import {
  PurchaseRequestRoutingComponent,
  PurchaseRequestListRoutingComponent,
  PurchaseRequestItemRoutingComponent, PurchaseRequestItemViewRoutingComponent, PurchaseRequestItemReplaceRoutingComponent,
  //PurchaseRequestItemCancelRoutingComponent, PurchaseRequestItemRejectRoutingComponent,
} from './purchase-request-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    DocumentModule,
    PurchaseRequestModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    //VendorModule,

    RouterModule.forChild([
      { path: '', component: PurchaseRequestRoutingComponent,
        children: [
          { path: '', component: PurchaseRequestListRoutingComponent },
          { path: 'add', component: PurchaseRequestItemRoutingComponent,
            children: [
              { path: '', component: PurchaseRequestItemReplaceRoutingComponent, data: {label: 'Purchase Request(Add)'} }
            ]
          },
          { path: ':id', component: PurchaseRequestItemRoutingComponent,
            children: [
              { path: '', component: PurchaseRequestItemViewRoutingComponent, data: {label: 'Purchase Request (View)' } },
              { path: 'replace', component: PurchaseRequestItemReplaceRoutingComponent, data: {label: 'Purchase Request (Replace)'} },
              { path: '', loadChildren: '@consol/document#TerminatedDocumentRoutingModule' },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    PurchaseRequestRoutingComponent,
    PurchaseRequestListRoutingComponent,
    PurchaseRequestItemRoutingComponent, PurchaseRequestItemViewRoutingComponent, PurchaseRequestItemReplaceRoutingComponent,
    //PurchaseRequestItemCancelRoutingComponent, PurchaseRequestItemRejectRoutingComponent,
  ],
})
export class PurchaseRequestRoutingModule {}
