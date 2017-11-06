import { Observable } from 'rxjs/Observable';

import { ModelFormCreate } from '@consol/shared';

import { ItemIndividualBase } from './item-individual.base';

export abstract class ItemService<T, C extends ItemIndividualBase<T>> {
  item$: Observable<T>;
  itemComponent: C;

  constructor(
    protected _modelFormCreate: ModelFormCreate<T>
  ) {
    this.item$ = null;
    this.itemComponent = null;
  }

  get modelFormCreate() { return this._modelFormCreate; }
}
