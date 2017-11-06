import { Document } from '@consol/document';

import { Vendor } from '@consol/vendor';
import { Project, ProjectBoq, ProjectBoqBudgetType } from '@consol/project';
import { Employee } from '@consol/employee';

import { PurchaseDetail } from './purchase-detail';

export class Purchase<D extends PurchaseDetail> extends Document {
  vendor: Vendor;
  vendorContactInformation: string;
  vendorAddress: string;
  project: Project;
  shippingAddress: string;
  requester: Employee;
  contactInformation: string;
  wantedDate: Date;

  boq: ProjectBoq;
  budgetType: ProjectBoqBudgetType;

  total: number;
  details: D[];

  static convert<D extends PurchaseDetail>(obj: any): Purchase<D> {
    if(obj && !(obj instanceof Purchase)){
      Object.setPrototypeOf(Document.convert(obj), Purchase.prototype);
      Vendor.convert(obj.vendor);
      Project.convert(obj.project);
      Employee.convert(obj.requester);

      ProjectBoq.convert(obj.boq);
      ProjectBoqBudgetType.convert(obj.budgetType);

      (obj.details || []).forEach((data) => PurchaseDetail.convert(data));
    }

    return obj;
  }
}
