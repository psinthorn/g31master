import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountArraySearchableControl } from '@consol/account';

import { Employee } from '../model';

import { EmployeeService } from '../employee.service';

export const CS_EMPLOYEE_ARRAY_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EmployeeArrayControlComponent),
  multi: true,
};

export const CS_EMPLOYEE_ARRAY_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => EmployeeArrayControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-employee-array-control',
  templateUrl: '../template/employee-array-control/employee-array-control.component.html',
  styleUrls: [ '../template/employee-array-control/employee-array-control.component.less' ],
  providers: [
    CS_EMPLOYEE_ARRAY_CONTROL_VALUE_ACCESSOR,
    CS_EMPLOYEE_ARRAY_CONTROL_VALIDATORS,
  ],
})
export class EmployeeArrayControlComponent
extends AccountArraySearchableControl<Employee> {
  constructor(
    ds: EmployeeService,
  ) {
    super(ds);
  }
}
