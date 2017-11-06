import {
  Component,
  Input,
} from '@angular/core';

import { DataControl } from '../data-control';

const defaultDebounceTime = 300;
const defaultMinTypeLength = 3;

export abstract class SearchableDataControl<T>
extends DataControl<T> {
  @Input('autocomplete') private _autocomplete: any;

  private _freeEnter: boolean;
  @Input('freeEnter') private set __freeEnter(value: any) {
    this._freeEnter = (value === '') || !!value;
  }

  @Input() private _debounceTime: number;
  @Input() private _minTypeLength: number;

  constructor() {
    super();

    this._freeEnter = false;
    this._debounceTime = defaultDebounceTime;
    this._minTypeLength = defaultMinTypeLength;
  }

  get autocomplete() { return this._autocomplete; }
  get freeEnter() { return this._freeEnter; }

  get debounceTime() { return this._debounceTime; }
  get minTypeLength() { return this._minTypeLength; }
}
