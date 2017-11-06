import { Input } from '@angular/core';

import { SearchableDataControl } from './searchable-data-control';

export abstract class DataSearchableControl<T>
extends SearchableDataControl<T> {
  @Input('dataObservableWith') private _dataObservableFn: Function;
  @Input('displayWith') private _displayFn: Function;

  constructor() {
    super();

    this._dataObservableFn = null;
    this._displayFn = null;
  }

  protected defaultDisplayFn(item: any) {
    if(item === null) return null;
    if(typeof item === 'string') return item;
    return (item)? item.toString() : null;
  };

  get dataObservableFn() { return this._dataObservableFn; }
  get displayFn() { return this._displayFn || this.defaultDisplayFn; }
}
