import { NgModule } from '@angular/core';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { VendorModule } from './vendor.module';
import { PersonModule } from '@consol/person';

import {
  VendorComponent,
  VendorListComponent,
  VendorItemComponent, VendorItemViewComponent, VendorItemEditComponent,
} from './vendor.component';

@NgModule({
  imports: [
    SharedModule,
    CustomModule,
    VendorModule,
    PersonModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    RouterModule.forChild([
      { path: '', component: VendorComponent,
        children: [
          { path: '', component: VendorListComponent },
          { path: 'add', component: VendorItemComponent,
            children: [
              { path: '', component: VendorItemEditComponent,
                data: { label: 'ADD VENDOR' }
              }
            ]
          },
          { path: ':id', component: VendorItemComponent,
            children: [
              { path: '', component: VendorItemViewComponent,
                data: { label: 'HOME (View)' }
              },
              { path: 'edit', component: VendorItemEditComponent,
                data: { label: 'HOME (Edit)' }
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    VendorComponent,
    VendorListComponent,
    VendorItemComponent, VendorItemViewComponent, VendorItemEditComponent,
  ]
})
export class VendorRoutingModule {}
