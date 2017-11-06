import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { CommonModule } from '@angular/common';
//import { MaterialModule } from '@angular/material';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { SettingFormService } from './setting-form.service';
import { SettingProfileFormService } from './setting-profile';
import { SettingVatFormService } from './setting-vat';
import { SettingTaxFormService } from './setting-tax';

import { SettingService } from './setting.service';
import { SettingProfileService } from './setting-profile';
import { SettingVatService } from './setting-vat';
import { SettingTaxService } from './setting-tax';

import {
  SettingItemRoutingLoaderDirective,
  SettingItemByCodeLoaderDirective,
} from './data-loader';

import { SettingTaxControlComponent } from './setting-tax';

import { SettingComponent } from './component';
import { SettingProfileComponent, SettingProfileViewComponent, SettingProfileEditComponent } from './setting-profile';
import { SettingVatComponent, SettingVatViewComponent, SettingVatEditComponent } from './setting-vat';
import { SettingTaxComponent, SettingTaxViewComponent, SettingTaxEditComponent } from './setting-tax';

@NgModule({
  imports: [
    RouterModule, // TODO: try to remove later
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // TODO: use from separated module
  ],
  exports: [
    SettingItemRoutingLoaderDirective,
    SettingItemByCodeLoaderDirective,

    SettingTaxControlComponent,

    SettingComponent,
    SettingProfileComponent, SettingProfileViewComponent, SettingProfileEditComponent,
    SettingVatComponent, SettingVatViewComponent, SettingVatEditComponent,
    SettingTaxComponent, SettingTaxViewComponent, SettingTaxEditComponent,
  ],
  declarations: [
    SettingItemRoutingLoaderDirective,
    SettingItemByCodeLoaderDirective,

    SettingTaxControlComponent,

    SettingComponent,
    SettingProfileComponent, SettingProfileViewComponent, SettingProfileEditComponent,
    SettingVatComponent, SettingVatViewComponent, SettingVatEditComponent,
    SettingTaxComponent, SettingTaxViewComponent, SettingTaxEditComponent,
  ],
  providers: [
    SettingFormService,
    SettingProfileFormService,
    SettingVatFormService,
    SettingTaxFormService,

    SettingService,
    SettingProfileService,
    SettingVatService,
    SettingTaxService,
  ],
})
export class SettingModule { }
