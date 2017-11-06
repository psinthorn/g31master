import { Injectable } from '@angular/core';
import {
  Http,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/map';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { PurchaseOrder, PurchaseOrderDetail, PurchaseRequestDetailStatusChanged } from './model';
import { PurchaseRequest, PurchaseRequestDetail } from '@consol/purchase-request';

// Stub Data
import {
  DocumentStubNewService,
} from '@consol/document/document-stub.new-service';

import {
  PurchaseRequestService,
} from '@consol/purchase-request';

@Injectable()
export class PurchaseOrderService extends DocumentStubNewService<PurchaseOrder, any> {
  protected static get serviceName() { return 'purchase_order'; }
  protected static get modelType() { return PurchaseOrder as ConvertableModelType<PurchaseOrder>; }
  protected static get prefix() { return 'PO'; }

  constructor(
    http: Http,
    sr: ServerResolverService,
    private purchaseRequestService: PurchaseRequestService,
  ) {
    super(http, sr);
  }

  getAllRemainPurchaseRequest(params?: {[prop: string]: any}): Observable<PurchaseRequest[]> {
    return this.purchaseRequestService.getAll(params)
      .map((purchaseRequests) => {
        const results: PurchaseRequest[] = [];

        for(let purchaseRequest of purchaseRequests) {
          const details: PurchaseRequestDetail[] = [];
          if(!purchaseRequest.terminated && purchaseRequest.approved) {
            for(let detail of purchaseRequest.details) {
              if(!(detail as any).updateTo) {
                details.push(detail);
              }
            }
          }
          if(details.length === 0) continue;
          purchaseRequest.details = details;

          results.push(purchaseRequest);
        }

        return results;
      })
    ;
  }

  getRemainPurchaseRequest(id: number): Observable<PurchaseRequest> {
    return this.getAllRemainPurchaseRequest()
      .map((purchaseRequests) => {
        return purchaseRequests.find((purchaseRequest) => +purchaseRequest.id === id);
      })
    ;
  }

  getFromPurchaseRequest(id: number): Observable<PurchaseOrder> {
    return this.getRemainPurchaseRequest(id)
      .map((purchaseRequest) => {
        return PurchaseOrderService.assignPurchaseOrderFromPurchaseRequest(new PurchaseOrder(), purchaseRequest);
      })
    ;
  }

  static assignPurchaseOrderFromPurchaseRequest(purchaseOrder: PurchaseOrder, purchaseRequest: PurchaseRequest): PurchaseOrder {
    Object.assign(purchaseOrder, purchaseRequest);
    purchaseOrder.details = [];
    (purchaseRequest.details || []).forEach((purchaseRequestDetail) => {
      const detail = new PurchaseOrderDetail();
      Object.assign(detail, purchaseRequestDetail);
      detail.statusChanged = new PurchaseRequestDetailStatusChanged();
      detail.statusChanged.purchaseRequestDetail = purchaseRequestDetail;
      detail.statusChanged.removed = false;

      purchaseOrder.details.push(detail);
    });

    return purchaseOrder;
  }
}
