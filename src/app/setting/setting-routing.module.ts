import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { SettingModule } from './setting.module';

import { SettingRootRoutingComponent, SettingRoutingComponent } from './setting-routing.component';
import { SettingProfileRoutingComponent, SettingProfileViewRoutingComponent, SettingProfileEditRoutingComponent } from './setting-profile';
import { SettingVatRoutingComponent, SettingVatViewRoutingComponent, SettingVatEditRoutingComponent } from './setting-vat';
import { SettingTaxRoutingComponent, SettingTaxViewRoutingComponent, SettingTaxEditRoutingComponent } from './setting-tax';

export const settingRoutes: Routes = [
  { path: '', component: SettingRootRoutingComponent,
    children: [
      { path: '', component: SettingRoutingComponent, data: {label: 'Setting'} },
      { path: 'profile', component: SettingProfileRoutingComponent,
        children: [
          { path: '', component: SettingProfileViewRoutingComponent, data: {label: 'Profile'} },
          { path: 'edit', component: SettingProfileEditRoutingComponent, data: {label: 'Edit Profile'} },
        ]
      },
      { path: 'vat', component: SettingVatRoutingComponent,
        children: [
          { path: '', component: SettingVatViewRoutingComponent, data: {label: 'Vat'} },
          { path: 'edit', component: SettingVatEditRoutingComponent, data: {label: 'Edit Vat'} },
        ]
      },
      { path: 'tax', component: SettingTaxRoutingComponent,
        children: [
          { path: '', component: SettingTaxViewRoutingComponent, data: {label: 'Tax'} },
          { path: 'edit', component: SettingTaxEditRoutingComponent, data: {label: 'Edit Tax'} },
        ]
      },
    ],
  },
];

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    SettingModule,
    RouterModule.forChild(settingRoutes),
  ],
  exports: [RouterModule],
  declarations: [
    SettingRootRoutingComponent, SettingRoutingComponent,
    SettingProfileRoutingComponent, SettingProfileViewRoutingComponent, SettingProfileEditRoutingComponent,
    SettingVatRoutingComponent, SettingVatViewRoutingComponent, SettingVatEditRoutingComponent,
    SettingTaxRoutingComponent, SettingTaxViewRoutingComponent, SettingTaxEditRoutingComponent,
  ],
})
export class SettingRoutingModule {}
