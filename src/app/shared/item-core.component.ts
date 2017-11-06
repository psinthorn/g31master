import { Input } from '@angular/core';

import { MetaDataBase, extractMetaAction, LinkData } from './model';

import { MetaDataProperty, OperatorsProperty } from './item-core.base';

export abstract class ItemCoreComponent
  implements MetaDataProperty<any>, OperatorsProperty{
  @Input('metaData') protected _metaData: MetaDataBase<any>;
  @Input('operators') protected _operators?: { readonly [operator: string]: () => any };
  @Input('links') protected _links?: { readonly [alias: string]: LinkData };

  constructor() {
    this._metaData = null;
    this._operators = {};
    this._links = {};
  }

  get metaData() { return this._metaData; }
  get operators() { return this._operators; }
  get links() { return this._links; }

  actionMeta(action: string): {[prop: string]: any} {
    return extractMetaAction(action, this.metaData);
  }
}
