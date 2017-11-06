import {
  Directive, forwardRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import {
  dataLoaderDirectiveName,
  DataLoaderEngine,
} from '@i3e/data-loader';

import { PurchaseRequest } from '@consol/purchase-request';

import { PurchaseOrderService } from '../purchase-order.service';

export const i3ePurchaseRequestRemainListRoutingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => PurchaseRequestRemainListRoutingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="csPurchaseRequestRemainListRouting"]`,
  providers: [ i3ePurchaseRequestRemainListRoutingLoaderEngine ],
})
export class PurchaseRequestRemainListRoutingLoaderDirective
implements DataLoaderEngine<{[key: string]: any}, PurchaseRequest[]> {
  constructor(
    private activatedRoute: ActivatedRoute,
    private ds: PurchaseOrderService,
  ) { }

  observable(): Observable<{[key: string]: any}> {
    return this.activatedRoute.queryParams;
  }

  load(params: {[key: string]: any}): Observable<PurchaseRequest[]> {
    return this.ds.getAllRemainPurchaseRequest(params);
  }
}
