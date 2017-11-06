import { Injectable, Component, Injector, Directive } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MediaMonitor } from '@angular/flex-layout';

import { ItemDeleteConfirmComponent } from '@consol/shared';

import { CostItemFormService } from './cost-item-form.service';
import { CostItemService } from './cost-item.service';
import { CostItem } from './model';

// RxJS import
import 'rxjs/add/operator/filter';

// For test
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  selector: 'cs-cost-item-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./template/cost-item-routing/cost-item-routing.component.less'],
})
export class CostItemRoutingComponent { }

@Component({
  selector: 'cs-cost-item-list-routing',
  template: '<cs-cost-item-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-cost-item-list>',
  styleUrls: ['./template/cost-item-routing/cost-item-routing.component.less'],
})
export class CostItemListRoutingComponent {
  constructor(
    public ds: CostItemService,
  ){ }
}

@Component({
  selector: 'cs-cost-item-item-routing',
  template: '<cs-cost-item-item i3eDataLoader="itemRouting" [dataService]="ds"  i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-cost-item-item>',
  styleUrls: ['./template/cost-item-routing/cost-item-routing.component.less']
})
export class CostItemItemRoutingComponent {
  constructor(
    public ds: CostItemService,
  ){ }
}

@Component({
  selector: 'cs-cost-item-item-view-routing',
  template: '<cs-cost-item-item-view i3eDataLoader="dataPreloading"></cs-cost-item-item-view>',
  styleUrls: ['./template/cost-item-routing/cost-item-routing.component.less'],
})
export class CostItemItemViewRoutingComponent {
  constructor(
    public ds: CostItemService,
  ){ }
}

@Component({
  selector: 'cs-cost-item-item-form-routing',
  template: '<cs-cost-item-item-form i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-cost-item-item-form>',
  styleUrls: ['./template/cost-item-routing/cost-item-routing.component.less'],
})
export class CostItemItemFormRoutingComponent {
  constructor(
    public ds: CostItemService,
  ){ }
}
