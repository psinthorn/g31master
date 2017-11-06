import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { SettingProfile } from '../model';

import { SettingProfileFormService } from './setting-profile-form.service';

@Component({
  selector: 'cs-setting-profile',
  templateUrl: './setting-profile.component.html',
  styleUrls: ['./setting-profile.component.less'],
})
export class SettingProfileComponent {
  constructor(
    @Self() private loader: DataLoader<SettingProfile>,
  ) { }
}

@Component({
  selector: 'cs-setting-profile-view',
  templateUrl: './setting-profile-view.component.html',
  styleUrls: ['./setting-profile.component.less'],
})
export class SettingProfileViewComponent {
  private _item: SettingProfile;

  constructor(
    @Self() private loader: DataLoader<SettingProfile>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = SettingProfile.convert(data);
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-setting-profile-edit',
  templateUrl: './setting-profile-edit.component.html',
  styleUrls: ['./setting-profile.component.less'],
})
export class SettingProfileEditComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<SettingProfile>,
    private formService: SettingProfileFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(SettingProfile.convert(data));
    });
  }

  itemCreateForm(item: SettingProfile){
    const form = this.formService.formCreate(item);

    return form;
  }
}
