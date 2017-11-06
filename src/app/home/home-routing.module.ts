import { NgModule }             from '@angular/core';
import { I3eModule } from '@i3e';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { HomeModule } from './home.module';

//import { VendorModule } from '@consol/vendor/vendor.module';

import {
  HomeRoutingComponent,
  HomeListRoutingComponent,
  HomeItemRoutingComponent, HomeItemViewRoutingComponent, HomeItemEditRoutingComponent,
} from './home-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    HomeModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    //VendorModule,

    RouterModule.forChild([
      { path: '', component: HomeRoutingComponent,
        children: [
          { path: '', component: HomeListRoutingComponent },
          { path: 'add', component: HomeItemRoutingComponent,
            children: [
              { path: '', component: HomeItemEditRoutingComponent, data: {label: 'HOME(Add)'} }
            ]
          },
          { path: ':id', component: HomeItemRoutingComponent,
            children: [
              { path: '', component: HomeItemViewRoutingComponent, data: {label: 'HOME(View)' } },
              { path: 'edit', component: HomeItemEditRoutingComponent, data: {label: 'HOME(Edit)'} },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    HomeRoutingComponent,
    HomeListRoutingComponent,
    HomeItemRoutingComponent, HomeItemViewRoutingComponent, HomeItemEditRoutingComponent,
  ],
})
export class HomeRoutingModule {}
