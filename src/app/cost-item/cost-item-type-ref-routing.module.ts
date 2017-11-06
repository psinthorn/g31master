import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
//import { MaterialModule } from '@angular/material';

import { CostItemTypeRefModule } from './cost-item-type-ref.module';

import {
  CostItemTypeRefRoutingComponent,
  CostItemTypeRefListRoutingComponent,
  CostItemTypeRefItemRoutingComponent, CostItemTypeRefItemViewRoutingComponent, CostItemTypeRefItemEditRoutingComponent,
} from './cost-item-type-ref-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    CostItemTypeRefModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    RouterModule.forChild([
      { path: '', component: CostItemTypeRefRoutingComponent,
        children: [
          { path: '', component: CostItemTypeRefListRoutingComponent },
          { path: 'add', component: CostItemTypeRefItemRoutingComponent,
            children: [
              { path: '', component: CostItemTypeRefItemEditRoutingComponent,
                data: { label: 'Add CostItemTypeRef' }
              }
            ]
          },
          { path: ':id', component: CostItemTypeRefItemRoutingComponent,
            children: [
              { path: '', component: CostItemTypeRefItemViewRoutingComponent,
                data: { label: 'View CostItemTypeRef' }
              },
              { path: 'edit', component: CostItemTypeRefItemEditRoutingComponent,
                data: { label: 'Edit CostItemTypeRef' }
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    CostItemTypeRefRoutingComponent,
    CostItemTypeRefListRoutingComponent,
    CostItemTypeRefItemRoutingComponent, CostItemTypeRefItemViewRoutingComponent, CostItemTypeRefItemEditRoutingComponent,
  ],
})
export class CostItemTypeRefRoutingModule {}
