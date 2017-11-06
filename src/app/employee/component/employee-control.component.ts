import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '@consol/account';

import { Employee } from '../model';

import { EmployeeService } from '../employee.service';

export const CS_EMPLOYEE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmployeeControlComponent),
  multi: true,
};

export const CS_EMPLOYEE_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmployeeControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-employee-control',
  templateUrl: '../template/employee-control/employee-control.component.html',
  styleUrls: [ '../template/employee-control/employee-control.component.less' ],
  providers: [
    CS_EMPLOYEE_CONTROL_VALUE_ACCESSOR,
    CS_EMPLOYEE_CONTROL_VALIDATORS,
  ],
})
export class EmployeeControlComponent
extends AccountSearchableControl<Employee> {
  constructor(
    ds: EmployeeService,
  ) {
    super(ds);
  }
}
