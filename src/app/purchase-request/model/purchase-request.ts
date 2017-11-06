import { Purchase } from '@consol/purchase';

import { PurchaseRequestDetail } from './purchase-request-detail';

export class PurchaseRequest extends Purchase<PurchaseRequestDetail> {
  details: PurchaseRequestDetail[];

  static convert(obj: any): PurchaseRequest {
    if(obj && !(obj instanceof PurchaseRequest)){
      Object.setPrototypeOf(Purchase.convert(obj), PurchaseRequest.prototype);

      (obj.details || []).forEach((data) => {PurchaseRequestDetail.convert(data)});
    }

    return obj;
  }
}
