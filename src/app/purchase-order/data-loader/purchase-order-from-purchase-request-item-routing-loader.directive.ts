import {
  Directive, forwardRef,
} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/map';

import {
  dataLoaderDirectiveName,
  DataLoaderEngine,
} from '@i3e/data-loader';

import { PurchaseOrder } from '../model';

import { PurchaseOrderService } from '../purchase-order.service';

export const i3ePurchaseOrderFromPurchaseRequestItemRoutingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => PurchaseOrderFromPurchaseRequestItemRoutingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="csPurchaseOrderFromPurchaseRequestItemRouting"]`,
  providers: [ i3ePurchaseOrderFromPurchaseRequestItemRoutingLoaderEngine ],
})
export class PurchaseOrderFromPurchaseRequestItemRoutingLoaderDirective
implements DataLoaderEngine<number, PurchaseOrder> {
  constructor(
    private activatedRoute: ActivatedRoute,
    private ds: PurchaseOrderService,
  ) { }

  observable(): Observable<number> {
    return this.activatedRoute.params.map((params) => +[params['id']] || null);
  }

  load(id: number): Observable<PurchaseOrder> {
    return this.ds.getFromPurchaseRequest(id);
  }
}
