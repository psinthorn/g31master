import { Component } from '@angular/core';

import { Person } from './model';

import { PersonFormService } from './person-form.service';
import { PersonService } from './person.service';

@Component({
  selector: 'cs-person-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonRoutingComponent { }

@Component({
  selector: 'cs-person-list-routing',
  template: '<cs-person-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor></cs-person-list>',
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonListRoutingComponent {
  constructor(
    public ds: PersonService,
  ) { }
}

@Component({
  selector: 'cs-person-select-routing',
  templateUrl: './template/person-routing/person-select-routing.component.html',
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonSelectRoutingComponent {
  constructor() { }
}

@Component({
  selector: 'cs-person-corporate-item-routing',
  template: '<cs-person-corporate-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-person-corporate-item>',
  styleUrls: ['./template/person-routing/person-routing.component.less']
})
export class PersonCorporateItemRoutingComponent {
  constructor(
    public ds: PersonService,
  ){ }
}

@Component({
  selector: 'cs-person-individual-item-routing',
  template: '<cs-person-individual-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-person-individual-item>',
  styleUrls: ['./template/person-routing/person-routing.component.less']
})
export class PersonIndividualItemRoutingComponent {
  constructor(
    public ds: PersonService,
  ){ }
}

@Component({
  selector: 'cs-person-corporate-item-view-routing',
  template: '<cs-person-corporate-item-view i3eDataLoader="dataPreloading"></cs-person-corporate-item-view>',
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonCorporateItemViewRoutingComponent {
  constructor(
    public ds: PersonService,
  ){ }
}

@Component({
  selector: 'cs-person-individual-item-view-routing',
  template: '<cs-person-individual-item-view i3eDataLoader="dataPreloading"></cs-person-individual-item-view>',
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonIndividualItemViewRoutingComponent {
  constructor(
    public ds: PersonService,
  ){ }
}

@Component({
  selector: 'cs-person-corporate-item-form-routing',
  template: '<cs-person-corporate-item-form i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-person-corporate-item-form>',
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonCorporateItemFormRoutingComponent {
  constructor(
    public ds: PersonService,
  ){ }
}

@Component({
  selector: 'cs-person-individual-item-form-routing',
  template: '<cs-person-individual-item-form i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds"></cs-person-individual-item-form>',
  styleUrls: ['./template/person-routing/person-routing.component.less'],
})
export class PersonIndividualItemFormRoutingComponent {
  constructor(
    public ds: PersonService,
  ){ }
}
