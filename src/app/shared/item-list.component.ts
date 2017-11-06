import { Component, Input } from '@angular/core';

import { MetaDataBase } from './model';

import { ItemCoreComponent } from './item-core.component';

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: [ './item-list.component.less' ]
})
export class ItemListComponent
  extends ItemCoreComponent {
  /*
  @Input('metaData') protected _metaData;
  @Input('operators') protected _operators?;
  */
  private _backable: boolean;
  @Input('backable') set backable(value) {
    this._backable = ((value as any === '') || !!value);
  }

  constructor() {
    super();

    this._backable = false;
  }

  get backable() { return this._backable; }
}
