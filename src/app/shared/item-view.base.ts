import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { ItemIndividualBase } from './item-individual.base';
import { ItemIndividualChildBase } from './item-individual-child.base';
import {
  ItemOnReadyMethod
} from './item-core.base';

export abstract class ItemDeleteConfirmMethod {
  abstract itemDeleteConfirm(): Observable<boolean>;

  static isValid(obj: any): obj is ItemDeleteConfirmMethod {
    return typeof obj.itemDeleteConfirm !== 'undefined';
  }
}

export abstract class ItemViewBase<T, C extends ItemIndividualBase<T>>
  extends ItemIndividualChildBase<T, C> {
  public item: T;

  constructor(
    itemComponent: C
  ) {
    super(itemComponent);

    Object.assign(this.operators, {
      delete: () => this.delete()
    });

    this.item = null;
  }

  protected _itemReady(item: T) {
    this.item = item;

    if(ItemOnReadyMethod.isValid(this)) this.itemOnReady();
  }

  delete(): void {
    (
      (ItemDeleteConfirmMethod.isValid(this))?
        this.itemDeleteConfirm() : Observable.of(true)
    )
      .filter((ans) => ans)
      .switchMap(() => this.itemComponent.delete$())
      .subscribe(() => this.itemComponent.back())
    ;
  }
}
