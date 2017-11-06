import { Component, Input } from '@angular/core';

@Component({
  selector: 'item-not-found',
  templateUrl: './item-not-found.component.html',
  styleUrls: [ './item-not-found.component.less' ]
})
export class ItemNotFoundComponent {
  @Input('subtitle') private _subtitle?: string;

  constructor() {
    this._subtitle = null;
  }

  get subtitle() { return this._subtitle; }
}
