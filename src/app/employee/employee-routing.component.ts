import { Component } from '@angular/core';

import { StateLabelConfig } from '@i3e/global-state';
import { AccountStateLabelConfig } from '@consol/account';

import { EmployeeFormService } from './employee-form.service';
import { EmployeeService } from './employee.service';
import { Employee } from './model';

export const csEmployeeStateLabelConfig = new AccountStateLabelConfig<Employee>('Employee');

@Component({
  selector: 'cs-employee-root-routing',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./template/employee-routing/employee-routing.component.less'],
  providers: [
    {provide: StateLabelConfig, useValue: csEmployeeStateLabelConfig },
  ],
})
export class EmployeeRoutingComponent { }

@Component({
  selector: 'cs-employee-list-routing',
  template: '<cs-employee-list i3eDataLoader="listRouting" [dataService]="ds" i3eProcessor csContextProcessor csItemRoutingProcessor csRoutingState="list"></cs-employee-list>',
  styleUrls: ['./template/employee-routing/employee-routing.component.less'],
})
export class EmployeeListRoutingComponent {
  constructor(
    public ds: EmployeeService,
  ){ }
}

@Component({
  selector: 'cs-employee-item-routing',
  template: '<cs-employee-item i3eDataLoader="itemRouting" [dataService]="ds" i3eProcessor csContextProcessor><router-outlet></router-outlet></cs-employee-item>',
  styleUrls: ['./template/employee-routing/employee-routing.component.less']
})
export class EmployeeItemRoutingComponent {
  constructor(
    public ds: EmployeeService,
  ){ }
}

@Component({
  selector: 'cs-employee-item-view-routing',
  template: '<cs-employee-item-view i3eDataLoader="dataPreloading" csRoutingState="view"></cs-employee-item-view>',
  styleUrls: ['./template/employee-routing/employee-routing.component.less'],
})
export class EmployeeItemViewRoutingComponent {
  constructor(
    public ds: EmployeeService,
  ){ }
}

@Component({
  selector: 'cs-employee-item-form-routing',
  template: '<cs-employee-item-form i3eDataLoader="dataPreloading" i3eProcessor csFormRoutingProcessor [dataService]="ds" csRoutingState="form"></cs-employee-item-form>',
  styleUrls: ['./template/employee-routing/employee-routing.component.less'],
})
export class EmployeeItemFormRoutingComponent {
  constructor(
    public ds: EmployeeService,
  ){ }
}
