import { OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { ItemIndividualBase } from './item-individual.base';

import {
  MetaDataProperty, OperatorsProperty
} from './item-core.base';

export abstract class ItemIndividualChildBase<T, C extends ItemIndividualBase<T>>
  implements OnInit, OnDestroy,
    MetaDataProperty<T>, OperatorsProperty {
  private item$$: Subscription;

  private _operators: { [operator: string]: () => any };

  constructor(
    private _itemComponent: C
  ) {
    this.item$$ = null;

    this._operators = {};
  }

  get itemComponent() { return this._itemComponent; }
  get metaData() { return this._itemComponent.metaData; }
  get operators() { return this._operators; }

  ngOnInit() {
    if(this.item$$) this.item$$.unsubscribe();
    this.item$$ = this.itemComponent.item$
      .subscribe((item) => {
        this._itemReady(item);
      })
    ;
  }

  ngOnDestroy() {
    if(this.item$$) this.item$$.unsubscribe();
  }

  protected abstract _itemReady(item: T): void;
}
