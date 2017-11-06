import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { I3eModule } from '@i3e';

//import { MaterialModule } from '@angular/material';

//import { VendorModule } from '@consol/vendor/vendor.module';

import { HomeFormService } from './home-form.service';
import { HomeService } from './home.service';

import {
  HomeListComponent,
  HomeItemComponent, HomeItemViewComponent, HomeItemEditComponent,

  MyTestDirective,
} from './home.component';

import { HomeControlComponent } from './home-control.component';

@NgModule({
  imports: [
    RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    //VendorModule,
  ],
  exports: [
    HomeListComponent,
    HomeItemComponent, HomeItemViewComponent, HomeItemEditComponent,

    HomeControlComponent,
  ],
  declarations: [
    HomeListComponent,
    HomeItemComponent, HomeItemViewComponent, HomeItemEditComponent,

    HomeControlComponent,

    MyTestDirective,
  ],
  providers: [ HomeFormService, HomeService ],
})
export class HomeModule { }
