import { Injectable, Component, Injector, Directive } from '@angular/core';
import { Http } from '@angular/http';

import { ProjectBoqFormService } from './project-boq-form.service';
import { ProjectBoqService } from './project-boq.service';
import { ProjectBoq } from './model';

// stub data
import { ProjectBoqStubService } from './project-boq.stub-service';

@Component({
  selector: 'cs-project-boq-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./template/project-boq-routing/project-boq-routing.component.less'],
  providers: [
    { provide: ProjectBoqService, useClass: ProjectBoqStubService },
  ],
})
export class ProjectBoqRoutingComponent { }

@Component({
  selector: 'cs-project-boq-list-routing',
  template: '<cs-project-boq-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-project-boq-list>',
  styleUrls: ['./template/project-boq-routing/project-boq-routing.component.less'],
})
export class ProjectBoqListRoutingComponent {
  constructor(
    public ds: ProjectBoqService,
  ){ }
}

@Component({
  selector: 'cs-project-boq-item-routing',
  template: '<cs-project-boq-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-project-boq-item>',
  styleUrls: ['./template/project-boq-routing/project-boq-routing.component.less']
})
export class ProjectBoqItemRoutingComponent {
  constructor(
    public ds: ProjectBoqService,
  ){ }
}

@Component({
  selector: 'cs-project-boq-item-view-routing',
  template: '<cs-project-boq-item-view i3eDataLoader="dataPreloading"></cs-project-boq-item-view>',
  styleUrls: ['./template/project-boq-routing/project-boq-routing.component.less'],
})
export class ProjectBoqItemViewRoutingComponent { }

@Component({
  selector: 'cs-project-boq-item-edit-routing',
  template: '<cs-project-boq-item-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-project-boq-item-edit>',
  styleUrls: ['./template/project-boq-routing/project-boq-routing.component.less'],
})
export class ProjectBoqItemEditRoutingComponent {
  constructor(
    public ds: ProjectBoqService,
  ){ }
}
