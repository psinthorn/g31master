import { Injectable, Component, Injector, Directive } from '@angular/core';
import { MediaMonitor } from '@angular/flex-layout';

import { ItemDeleteConfirmComponent } from '@consol/shared';

import { HomeFormService } from './home-form.service';
import { HomeService } from './home.service';
import { Home, HomeDetail } from './model';

// RxJS import
import 'rxjs/add/operator/filter';

// For test
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  selector: 'home-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./home.component.less'],
})
export class HomeRoutingComponent { }

@Component({
  selector: 'home-list-routing',
  template: `<home-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></home-list>`,
  styleUrls: ['./home.component.less'],
})
export class HomeListRoutingComponent {
  constructor(
    public ds: HomeService,
  ) { }
}

@Component({
  selector: 'home-item-routing',
  template: '<home-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></home-item>',
  styleUrls: ['./home.component.less']
})
export class HomeItemRoutingComponent {
  constructor(
    public ds: HomeService,
  ){ }
}

@Component({
  selector: 'home-item-view-routing',
  template: '<home-item-view i3eDataLoader="dataPreloading"></home-item-view>',
  styleUrls: ['./home.component.less'],
})
export class HomeItemViewRoutingComponent { }

@Component({
  selector: 'home-item-edit-routing',
  template: '<home-item-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></home-item-edit>',
  styleUrls: ['./home.component.less'],
})
export class HomeItemEditRoutingComponent {
  constructor(
    public ds: HomeService,
  ){ }
}
