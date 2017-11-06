import { Injectable, Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PurchaseOrder, PurchaseOrderDetail } from './model';
import { PurchaseOrderFormService } from './purchase-order-form.service';
import { PurchaseOrderService } from './purchase-order.service';

@Component({
  selector: 'cs-purchase-order-root-routing',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./purchase-order-routing.component.less'],
})
export class PurchaseOrderRoutingComponent {
  constructor() { }
}

@Component({
  selector: 'cs-purchase-order-list-routing',
  template: '<cs-purchase-order-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-purchase-order-list>',
  styleUrls: ['./purchase-order-routing.component.less'],
})
export class PurchaseOrderListRoutingComponent {
  constructor(
    public ds: PurchaseOrderService,
  ) { }
}

@Component({
  selector: 'cs-purchase-order-item-routing',
  template: '<cs-purchase-order-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-purchase-order-item>',
  styleUrls: ['./purchase-order-routing.component.less']
})
export class PurchaseOrderItemRoutingComponent {
  constructor(
    public ds: PurchaseOrderService,
  ) { }
}

@Component({
  selector: 'cs-purchase-order-item-view-routing',
  template: '<cs-purchase-order-item-view i3eDataLoader="dataPreloading"></cs-purchase-order-item-view>',
  styleUrls: ['./purchase-order-routing.component.less'],
})
export class PurchaseOrderItemViewRoutingComponent { }

@Component({
  selector: 'cs-purchase-order-item-replace-routing',
  template: '<cs-purchase-order-item-replace i3eDataLoader="dataPreloading"></cs-purchase-order-item-replace>',
  styleUrls: ['./purchase-order-routing.component.less']
})
export class PurchaseOrderItemReplaceRoutingComponent { }

@Component({
  selector: 'cs-purchase-request-remain-list-routing',
  template: '<cs-purchase-request-remain-list i3eDataLoader="csPurchaseRequestRemainListRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-purchase-request-remain-list>',
  styleUrls: ['./purchase-order-routing.component.less']
})
export class PurchaseRequestRemainListRoutingComponent {
  constructor(
    public ds: PurchaseOrderService,
  ) { }
}

@Component({
  selector: 'cs-purchase-order-from-purchase-request-item-routing',
  template: '<cs-purchase-order-item i3eDataLoader="csPurchaseOrderFromPurchaseRequestItemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-purchase-order-item>',
  styleUrls: ['./purchase-order-routing.component.less']
})
export class PurchaseOrderFromPurchaseRequestItemRoutingComponent {
  constructor(
    public ds: PurchaseOrderService,
  ) { }
}

/*
@Component({
  selector: 'cs-purchase-order-item-cancel-routing',
  template: '<cs-document-terminat type="CANCEL" i3eDataLoader="dataPreloading"></cs-document-terminat>',
  styleUrls: ['./purchase-order.component.less']
})
export class PurchaseOrderItemCancelRoutingComponent { }

@Component({
  selector: 'cs-purchase-order-item-reject-routing',
  template: '<cs-document-terminat type="REJECT" i3eDataLoader="dataPreloading"></cs-document-terminat>',
  styleUrls: ['./purchase-order.component.less']
})
export class PurchaseOrderItemRejectRoutingComponent { }
*/
