import { PurchaseRequestDetail } from '@consol/purchase-request';

export class PurchaseRequestDetailStatusChanged {
  id: string;
  purchaseRequestDetail: PurchaseRequestDetail;
  removed: boolean;

  static convert(obj: any): PurchaseRequestDetailStatusChanged {
    if(obj && !(obj instanceof PurchaseRequestDetailStatusChanged)) {
      Object.setPrototypeOf(obj, PurchaseRequestDetailStatusChanged.prototype);
      PurchaseRequestDetail.convert(obj.purchaseRequestDetail);
    }

    return obj;
  }
}
