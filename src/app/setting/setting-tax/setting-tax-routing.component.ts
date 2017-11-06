import { Component } from '@angular/core';

import { SettingTaxService } from './setting-tax.service';

@Component({
  selector: 'cs-setting-tax-routing',
  template: '<cs-setting-tax i3eDataLoader="csSettingItemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-setting-tax>',
  styleUrls: ['./setting-tax-routing.component.less'],
})
export class SettingTaxRoutingComponent {
  constructor(
    public ds: SettingTaxService,
  ) { }
}

@Component({
  selector: 'cs-setting-tax-view-routing',
  template: '<cs-setting-tax-view i3eDataLoader="dataPreloading"></cs-setting-tax-view>',
  styleUrls: ['./setting-tax-routing.component.less'],
})
export class SettingTaxViewRoutingComponent { }

@Component({
  selector: 'cs-setting-tax-edit-routing',
  template: '<cs-setting-tax-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-setting-tax-edit>',
  styleUrls: ['./setting-tax-routing.component.less'],
})
export class SettingTaxEditRoutingComponent {
  constructor(
    public ds: SettingTaxService,
  ) { }
}
