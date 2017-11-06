import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { EmployeeFormService } from '../employee-form.service';
import { Employee } from '../model';

@Component({
  selector: 'cs-employee-list',
  templateUrl: '../template/employee/employee-list.component.html',
  styleUrls: ['../template/employee/employee.component.less'],
})
export class EmployeeListComponent {
  private _items: Employee[];

  constructor(
    @Self() private loader: DataLoader<Employee[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}

@Component({
  selector: 'cs-employee-item',
  templateUrl: '../template/employee/employee-item.component.html',
  styleUrls: ['../template/employee/employee.component.less']
})
export class EmployeeItemComponent {
  constructor(
    @Self() private loader: DataLoader<Employee>,
  ) { }
}

@Component({
  selector: 'cs-employee-item-view',
  templateUrl: '../template/employee/employee-item-view.component.html',
  styleUrls: ['../template/employee/employee.component.less']
})
export class EmployeeItemViewComponent {
  private _item: Employee;

  constructor(
    @Self() private loader: DataLoader<Employee>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-employee-item-form',
  templateUrl: '../template/employee/employee-item-form.component.html',
  styleUrls: ['../template/employee/employee.component.less']
})
export class EmployeeItemFormComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<Employee>,
    private formService: EmployeeFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  itemCreateForm(item: Employee){
    const form = this.formService.formCreate(item);

    return form;
  }
}
