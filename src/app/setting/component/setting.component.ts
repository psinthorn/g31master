import { Component, Self } from '@angular/core';

import { DataLoader } from '@i3e/data-loader';

import { Setting } from '../model';

@Component({
  selector: 'cs-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.less'],
})
export class SettingComponent {
  private _items: Setting[];

  constructor(
    @Self() private loader: DataLoader<Setting[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}
