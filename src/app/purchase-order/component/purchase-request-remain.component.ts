import { Component, Self } from '@angular/core';

import { DataLoader } from '@i3e/data-loader';

import { PurchaseRequest } from '@consol/purchase-request';

@Component({
  selector: 'cs-purchase-request-remain-list',
  templateUrl: './purchase-request-remain-list.component.html',
  styleUrls: ['./purchase-request-remain.component.less'],
})
export class PurchaseRequestRemainListComponent {
  private _items: PurchaseRequest[];

  constructor(
    @Self() private loader: DataLoader<PurchaseRequest[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}
