import { Component, Injector } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';

import {
  ComponentInfoService,
  ItemRootBase,
} from '@consol/shared';

@Component({
  selector: 'cs-master-root',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.less']
})
export class MasterComponent extends ItemRootBase {
  constructor(injector: Injector, depComp: ComponentInfoService){
    super(injector);
  }
}

@Component({
  selector: 'cs-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master.component.less']
})
export class MasterListComponent {
  public routes: Route[];

  constructor(private activatedRoute: ActivatedRoute) {
    this.routes = this.activatedRoute.parent.routeConfig.children
      .filter((route) =>
        route.data && route.data['selectedType'] &&
        (route.data['selectedType'] === 'submodule'))
    ;
  }
}
