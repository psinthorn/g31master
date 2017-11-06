import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { SettingTax } from '../model';

import { SettingTaxFormService } from './setting-tax-form.service';

@Component({
  selector: 'cs-setting-tax',
  templateUrl: './setting-tax.component.html',
  styleUrls: ['./setting-tax.component.less'],
})
export class SettingTaxComponent {
  constructor(
    @Self() private loader: DataLoader<SettingTax>,
  ) { }
}

@Component({
  selector: 'cs-setting-tax-view',
  templateUrl: './setting-tax-view.component.html',
  styleUrls: ['./setting-tax.component.less'],
})
export class SettingTaxViewComponent {
  private _item: SettingTax;

  constructor(
    @Self() private loader: DataLoader<SettingTax>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = SettingTax.convert(data);
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-setting-tax-edit',
  templateUrl: './setting-tax-edit.component.html',
  styleUrls: ['./setting-tax.component.less'],
})
export class SettingTaxEditComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<SettingTax>,
    private formService: SettingTaxFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(SettingTax.convert(data));
    });
  }

  itemCreateForm(item: SettingTax){
    const form = this.formService.formCreate(item);

    return form;
  }

  createItem(value?: number) {
    return this.formService.createItem(value);
  }
}
