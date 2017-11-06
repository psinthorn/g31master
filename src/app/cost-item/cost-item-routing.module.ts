import { NgModule } from '@angular/core';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { I3eModule } from '@i3e';

import { CostItemModule } from './cost-item.module';

import { CostItemTypeRefModule } from './cost-item-type-ref.module';

import {
  CostItemRoutingComponent,
  CostItemListRoutingComponent,
  CostItemItemRoutingComponent,
  CostItemItemViewRoutingComponent, CostItemItemFormRoutingComponent,
} from './cost-item-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    CostItemModule,
    CostItemTypeRefModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    RouterModule.forChild([
      { path: '', component: CostItemRoutingComponent,
        children: [
          { path: '', component: CostItemListRoutingComponent },
          { path: 'type', loadChildren: './cost-item-type-ref-routing.module#CostItemTypeRefRoutingModule' },
          { path: 'add', component: CostItemItemRoutingComponent,
            children: [
              { path: '', component: CostItemItemFormRoutingComponent,
                data: { label: 'Add CostItem' }
              }
            ]
          },
          { path: ':id', component: CostItemItemRoutingComponent,
            children: [
              { path: '', component: CostItemItemViewRoutingComponent,
                data: { label: 'View CostItem' }
              },
              { path: 'edit', component: CostItemItemFormRoutingComponent,
                data: { label: 'Edit CostItem' }
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    CostItemRoutingComponent,
    CostItemListRoutingComponent,
    CostItemItemRoutingComponent,
    CostItemItemViewRoutingComponent, CostItemItemFormRoutingComponent,
  ]
})
export class CostItemRoutingModule {}
