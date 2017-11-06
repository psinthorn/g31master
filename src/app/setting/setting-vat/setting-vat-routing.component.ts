import { Component } from '@angular/core';

import { SettingVatService } from './setting-vat.service';

@Component({
  selector: 'cs-setting-vat-routing',
  template: '<cs-setting-vat i3eDataLoader="csSettingItemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-setting-vat>',
  styleUrls: ['./setting-vat-routing.component.less'],
})
export class SettingVatRoutingComponent {
  constructor(
    public ds: SettingVatService,
  ) { }
}

@Component({
  selector: 'cs-setting-vat-view-routing',
  template: '<cs-setting-vat-view i3eDataLoader="dataPreloading"></cs-setting-vat-view>',
  styleUrls: ['./setting-vat-routing.component.less'],
})
export class SettingVatViewRoutingComponent { }

@Component({
  selector: 'cs-setting-vat-edit-routing',
  template: '<cs-setting-vat-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-setting-vat-edit>',
  styleUrls: ['./setting-vat-routing.component.less'],
})
export class SettingVatEditRoutingComponent {
  constructor(
    public ds: SettingVatService,
  ) { }
}
