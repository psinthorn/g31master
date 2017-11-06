import { CostItem } from '@consol/cost-item';
import { ProjectBoqData } from '@consol/project';

export class PurchaseDetail {
  id: string;
  costItem: CostItem;
  price: number;
  quantity: number;
  boqData: ProjectBoqData;
  remark: string;

  static convert(obj: any): PurchaseDetail {
    if(obj && !(obj instanceof PurchaseDetail)) {
      Object.setPrototypeOf(obj, PurchaseDetail.prototype);
      CostItem.convert(obj.costItem);
      ProjectBoqData.convert(obj.boqData);
    }

    return obj;
  }
}
