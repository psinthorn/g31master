import { Component } from '@angular/core';

import { SettingService } from './setting.service';

import { Setting } from './model';

@Component({
  selector: 'cs-setting-root-routing',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./setting.component.less'],
})
export class SettingRootRoutingComponent {
  constructor() { }
}

@Component({
  selector: 'cs-setting-routing',
  template: '<cs-setting i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-setting>',
  styleUrls: ['./setting.component.less'],
})
export class SettingRoutingComponent<T extends Setting> {
  constructor(
    public ds: SettingService<T>,
  ) { }
}
