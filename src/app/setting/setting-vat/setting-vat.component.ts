import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { SettingVat } from '../model';

import { SettingVatFormService } from './setting-vat-form.service';

@Component({
  selector: 'cs-setting-vat',
  templateUrl: './setting-vat.component.html',
  styleUrls: ['./setting-vat.component.less'],
})
export class SettingVatComponent {
  constructor(
    @Self() private loader: DataLoader<SettingVat>,
  ) { }
}

@Component({
  selector: 'cs-setting-vat-view',
  templateUrl: './setting-vat-view.component.html',
  styleUrls: ['./setting-vat.component.less'],
})
export class SettingVatViewComponent {
  private _item: SettingVat;

  constructor(
    @Self() private loader: DataLoader<SettingVat>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = SettingVat.convert(data);
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-setting-vat-edit',
  templateUrl: './setting-vat-edit.component.html',
  styleUrls: ['./setting-vat.component.less'],
})
export class SettingVatEditComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<SettingVat>,
    private formService: SettingVatFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(SettingVat.convert(data));
    });
  }

  itemCreateForm(item: SettingVat){
    const form = this.formService.formCreate(item);

    return form;
  }
}
