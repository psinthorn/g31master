import { Component } from '@angular/core';

import { ProjectFormService } from './project-form.service';
import { ProjectService } from './project.service';
import { Project } from './model';

@Component({
  selector: 'cs-project-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./template/project-routing/project-routing.component.less'],
})
export class ProjectRoutingComponent { }

@Component({
  selector: 'cs-project-list-routing',
  template: '<cs-project-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-project-list>',
  styleUrls: ['./template/project-routing/project-routing.component.less'],
})
export class ProjectListRoutingComponent {
  constructor(
    public ds: ProjectService,
  ){ }
}

@Component({
  selector: 'cs-project-item-routing',
  template: '<cs-project-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor [descriptionOverride]="descriptionOverride"><router-outlet></router-outlet></cs-project-item>',
  styleUrls: ['./template/project-routing/project-routing.component.less'],
})
export class ProjectItemRoutingComponent {
  readonly descriptionOverride = {
    'boq': { icon: 'monetization_on', color: 'primary', label: 'BOQ' },
  };

  constructor(
    public ds: ProjectService,
  ){ }
}

@Component({
  selector: 'cs-project-item-view-routing',
  template: '<cs-project-item-view i3eDataLoader="dataPreloading"></cs-project-item-view>',
  styleUrls: ['./template/project-routing/project-routing.component.less'],
})
export class ProjectItemViewRoutingComponent { }

@Component({
  selector: 'cs-project-item-edit-routing',
  template: '<cs-project-item-edit i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-project-item-edit>',
  styleUrls: ['./template/project-routing/project-routing.component.less'],
})
export class ProjectItemEditRoutingComponent {
  constructor(
    public ds: ProjectService,
  ){ }
}
