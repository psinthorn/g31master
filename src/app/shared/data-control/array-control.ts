import { Input } from '@angular/core';

import { isObjectEqual, booleanAttribute } from '@i3e/function';

import { DataControl } from './data-control';

export abstract class ArrayControl<T>
extends DataControl<T[]> {
  private _duplicatable: boolean;
  @Input('duplicatable') private set __duplicatable(value) {
    this._duplicatable = booleanAttribute(value);
  }

  constructor() {
    super();

    this._duplicatable = true;
  }

  get duplicatable() { return this._duplicatable; }
}
