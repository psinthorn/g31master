import { PurchaseDetail } from '@consol/purchase';

import { PurchaseRequestDetailStatusChanged } from './purchase-request-detail-status-changed';

export class PurchaseOrderDetail extends PurchaseDetail {
  statusChanged: PurchaseRequestDetailStatusChanged;

  static convert(obj: any): PurchaseOrderDetail {
    if(obj && !(obj instanceof PurchaseDetail)) {
      Object.setPrototypeOf(PurchaseDetail.convert(obj), PurchaseOrderDetail.prototype);
      PurchaseRequestDetailStatusChanged.convert(obj.statusChanged);
    }

    return obj;
  }
}
