import { CostItem } from '@consol/cost-item';
import { ProjectBoqData } from '@consol/project';

import { PurchaseDetail } from '@consol/purchase';

export class PurchaseRequestDetail extends PurchaseDetail {
  name: string;
  unit: string;

  static convert(obj: any): PurchaseRequestDetail {
    if(obj && !(obj instanceof PurchaseRequestDetail)) {
      Object.setPrototypeOf(PurchaseDetail.convert(obj), PurchaseRequestDetail.prototype);
    }

    return obj;
  }
}
