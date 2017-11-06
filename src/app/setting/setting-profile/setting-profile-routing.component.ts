import { Component } from '@angular/core';

import { SettingProfileService } from './setting-profile.service';

@Component({
  selector: 'cs-setting-profile-routing',
  template: '<cs-setting-profile i3eDataLoader="csSettingItemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-setting-profile>',
  styleUrls: ['./setting-profile-routing.component.less'],
})
export class SettingProfileRoutingComponent {
  constructor(
    public ds: SettingProfileService,
  ) { }
}

@Component({
  selector: 'cs-setting-profile-view-routing',
  template: '<cs-setting-profile-view i3eDataLoader="dataPreloading"></cs-setting-profile-view>',
  styleUrls: ['./setting-profile-routing.component.less'],
})
export class SettingProfileViewRoutingComponent { }

@Component({
  selector: 'cs-setting-profile-edit-routing',
  template: '<cs-setting-profile-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-setting-profile-edit>',
  styleUrls: ['./setting-profile-routing.component.less'],
})
export class SettingProfileEditRoutingComponent {
  constructor(
    public ds: SettingProfileService,
  ) { }
}
