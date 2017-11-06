import { Injectable, Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';

import { PurchaseRequest, PurchaseRequestDetail } from './model';
import { PurchaseRequestFormService } from './purchase-request-form.service';
import { PurchaseRequestService } from './purchase-request.service';

@Component({
  selector: 'cs-purchase-request-root-routing',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./purchase-request.component.less'],
})
export class PurchaseRequestRoutingComponent {
  constructor() { }
}

@Component({
  selector: 'cs-purchase-request-list-routing',
  template: '<cs-purchase-request-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-purchase-request-list>',
  styleUrls: ['./purchase-request.component.less'],
})
export class PurchaseRequestListRoutingComponent {
  constructor(
    public ds: PurchaseRequestService,
  ) { }
}

@Component({
  selector: 'cs-purchase-request-item-routing',
  template: '<cs-purchase-request-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-purchase-request-item>',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemRoutingComponent {
  constructor(
    public ds: PurchaseRequestService,
  ) { }
}

@Component({
  selector: 'cs-purchase-request-item-view-routing',
  template: '<cs-purchase-request-item-view i3eDataLoader="dataPreloading"></cs-purchase-request-item-view>',
  styleUrls: ['./purchase-request.component.less'],
})
export class PurchaseRequestItemViewRoutingComponent { }

@Component({
  selector: 'cs-purchase-request-item-replace-routing',
  template: '<cs-purchase-request-item-replace i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-purchase-request-item-replace>',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemReplaceRoutingComponent {
  constructor(
    public ds: PurchaseRequestService,
  ) { }
}

/*
@Component({
  selector: 'cs-purchase-request-item-cancel-routing',
  template: '<cs-document-terminat type="CANCEL" i3eDataLoader="dataPreloading"></cs-document-terminat>',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemCancelRoutingComponent { }

@Component({
  selector: 'cs-purchase-request-item-reject-routing',
  template: '<cs-document-terminat type="REJECT" i3eDataLoader="dataPreloading"></cs-document-terminat>',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemRejectRoutingComponent { }
*/
