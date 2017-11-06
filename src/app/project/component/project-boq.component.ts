import {
  Component, Self,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/switchMap';

import { DataLoader } from '@i3e/data-loader';

import {
  ProjectItemComponent,
} from '../component/project.component';

import { ProjectBoqFormService } from '../project-boq-form.service';
import { ProjectBoqService } from '../project-boq.service';
import { ProjectBoq } from '../model';

@Component({
  selector: 'cs-project-boq-list',
  templateUrl: '../template/project-boq/project-boq-list.component.html',
  styleUrls: ['../template/project-boq/project-boq.component.less'],
})
export class ProjectBoqListComponent {
  private _items: ProjectBoq[];

  constructor(
    @Self() private loader: DataLoader<ProjectBoq[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}

@Component({
  selector: 'cs-project-boq-item',
  templateUrl: '../template/project-boq/project-boq-item.component.html',
  styleUrls: ['../template/project-boq/project-boq.component.less']
})
export class ProjectBoqItemComponent {
  constructor(
    @Self() private loader: DataLoader<ProjectBoq>,
  ) { }
}

@Component({
  selector: 'cs-project-boq-item-view',
  templateUrl: '../template/project-boq/project-boq-item-view.component.html',
  styleUrls: ['../template/project-boq/project-boq.component.less'],
})
export class ProjectBoqItemViewComponent {
  private _item: ProjectBoq;

  constructor(
    @Self() private loader: DataLoader<ProjectBoq>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-project-boq-item-edit',
  templateUrl: '../template/project-boq/project-boq-item-edit.component.html',
  styleUrls: ['../template/project-boq/project-boq.component.less']
})
export class ProjectBoqItemEditComponent {
  public form: FormGroup;
  private _createBudgetTypeFn: Function;

  constructor(
    @Self() private loader: DataLoader<ProjectBoq>,
    private formService: ProjectBoqFormService,
  ) {
    this.form = null;
    this._createBudgetTypeFn = (item?: any) => this.createBudgetType(item);

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }


  get budgetTypes() {
    return this.form.value.budgetTypes;
  }

  get createBudgetTypeFn() { return this._createBudgetTypeFn; }

  itemCreateForm(item: ProjectBoq){
    let formGroup = this.formService.formCreate(item);
    /*
    if(!formGroup.get('project').value) {
      formGroup.get('project').setValue(this.itemComponent.project);
    }
    */

    return formGroup;
  }

  createBudgetType(item?: any) {
    return this.formService.createBudgetType(item);
  }

  createDetail(item?: any) {
    item = item || {
      budgets: this.budgetTypes.reduce((budgets, budgetType) => {
        budgets[budgetType._code] = {budget: '0.00'};
        return budgets;
      }, {}),
    };

    let detail = this.formService.createChild(item);
    let formArray = this.form.get('children') as FormArray;
    formArray.push(detail);

    return detail;
  }

  createBudgetIfNeed(name: string) {
    let budgetsFormGroup = this.form.get('budgets') as FormGroup;
    if(!budgetsFormGroup.contains(name)) {
      budgetsFormGroup.addControl(name, this.formService.createBudget(name, {budget: '0.00'} as any));
    }

    return name;
  }
}
