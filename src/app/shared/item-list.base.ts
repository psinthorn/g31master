import { Injector } from '@angular/core';

// RxJS operators
import 'rxjs/add/operator/map';

import { DataService } from './data.service';

import {
  ItemBasedBase,
  ItemLoadMethod, ItemOnReadyMethod, ItemClearMethod
} from './item-core.base';

export abstract class ItemListBase<T>
  extends ItemBasedBase<Array<T>> {
  public items: Array<T>;
  public itemQuery: any;

  constructor(
    injector: Injector,
    private _ds: DataService<T>
  ) {
    super(injector);

    this.items = null;
    this.itemQuery = null;
  }

  protected get ds() { return this._ds; }

  protected _observable() {
    return this.route.queryParams
      //.debounceTime(300)
      .map((obj) => this.route.snapshot)
    ;
  }

  protected _itemLoad(snapshot) {
    if(ItemLoadMethod.isValid<Array<T>>(this)){
      return this.itemLoad(snapshot);
    } else{
      return this.ds.getAll(snapshot.queryParams);
    }
  }

  protected _itemReady(items) {
    this.items = items;
    this.itemQuery = Object.assign({}, this.route.snapshot.queryParams);
    if(ItemOnReadyMethod.isValid(this)) this.itemOnReady();
  }

  protected _itemClear() {
    this.items = null;
    if(ItemClearMethod.isValid(this)) this.itemClear();
  }
}
