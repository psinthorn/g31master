import { OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MetaDataBase } from './model';

import { ItemService } from './item.service';

import { ItemIndividualBase } from './item-individual.base';
import {
  MetaDataProperty, OperatorsProperty,
  ItemLoadMethod, ItemOnReadyMethod, ItemClearMethod
} from './item-core.base';

export abstract class ItemFromItemServiceBase<T>
  implements OnInit, OnDestroy,
    MetaDataProperty<T>, OperatorsProperty {
  protected _item$$: Subscription;

  protected _operators: { [operator: string]: () => any};

  constructor(
    protected _is: ItemService<T, ItemIndividualBase<T>>
  ) {
    this._item$$ = null;

    this._operators = {};
  }

  get metaData() { return this._is.itemComponent.metaData; }
  get operators() { return this._operators; }

  ngOnInit() {
    if(this._item$$) this._item$$.unsubscribe();
    this._item$$ = this._is.item$
      .subscribe((item) => {
        this._itemReady(item);
      })
    ;
  }

  ngOnDestroy() {
    if(this._item$$) this._item$$.unsubscribe();
  }

  protected abstract _itemReady(item: T): void;
}
