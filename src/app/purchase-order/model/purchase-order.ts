import { Purchase } from '@consol/purchase';

import { PurchaseOrderDetail } from './purchase-order-detail';

export class PurchaseOrder extends Purchase<PurchaseOrderDetail> {
  discount: number;
  costItemTotal: number;
  vatFactor: boolean;
  vatIncluded: boolean;
  vat: number;
  vatCost: number;
  excludeVat: number;
  docTotal: number;
  tax: number;
  taxFactor: boolean;
  taxCost: number;
  payTotal: number;

  static convert(obj: any): PurchaseOrder {
    if(obj && !(obj instanceof PurchaseOrder)) {
      Object.setPrototypeOf(Purchase.convert(obj), PurchaseOrder.prototype);
    }

    return obj;
  }
}
