import { Component } from '@angular/core';

import { CostItemTypeRefService } from './cost-item-type-ref.service';
import { CostItemTypeRef } from './model';

// RxJS import
import 'rxjs/add/operator/filter';

// For test
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  selector: 'cs-cost-item-type-ref-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./template/cost-item-type-ref-routing/cost-item-type-ref-routing.component.less'],
})
export class CostItemTypeRefRoutingComponent { }

@Component({
  selector: 'cs-cost-item-type-ref-list-routing',
  template: '<cs-cost-item-type-ref-list i3eDataLoader="listRouting" [dataService]="ds"  i3eProcessor csContextProcessor csItemRoutingProcessor></cs-cost-item-type-ref-list>',
  styleUrls: ['./template/cost-item-type-ref-routing/cost-item-type-ref-routing.component.less'],
})
export class CostItemTypeRefListRoutingComponent {
  constructor(
    public ds: CostItemTypeRefService,
  ){ }
}

@Component({
  selector: 'cs-cost-item-type-ref-item-routing',
  template: '<cs-cost-item-type-ref-item i3eDataLoader="itemRouting" [dataService]="ds"  i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-cost-item-type-ref-item>',
  styleUrls: ['./template/cost-item-type-ref-routing/cost-item-type-ref-routing.component.less']
})
export class CostItemTypeRefItemRoutingComponent {
  constructor(
    public ds: CostItemTypeRefService,
  ){ }
}

@Component({
  selector: 'cs-cost-item-type-ref-item-view-routing',
  template: '<cs-cost-item-type-ref-item-view i3eDataLoader="dataPreloading"></cs-cost-item-type-ref-item-view>',
  styleUrls: ['./template/cost-item-type-ref-routing/cost-item-type-ref-routing.component.less'],
})
export class CostItemTypeRefItemViewRoutingComponent { }

@Component({
  selector: 'cs-cost-item-type-ref-item-edit-routing',
  template: '<cs-cost-item-type-ref-item-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-cost-item-type-ref-item-edit>',
  styleUrls: ['./template/cost-item-type-ref-routing/cost-item-type-ref-routing.component.less'],
})
export class CostItemTypeRefItemEditRoutingComponent {
  constructor(
    public ds: CostItemTypeRefService,
  ){ }
}
