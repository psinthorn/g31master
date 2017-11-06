import { Component, Self, Input } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';

import { ProjectBoqDataFormService } from '../project-boq-data-form.service';

import { ProjectBoqBudgetType } from '../model';

@Component({
  selector: 'cs-project-boq-data',
  templateUrl: '../template/project-boq-data/project-boq-data.component.html',
  styleUrls: ['../template/project-boq-data/project-boq-data.component.less']
})
export class ProjectBoqDataComponent {
  @Input('budgetTypes') private _budgetTypes: ProjectBoqBudgetType[];
  @Input('index') private _index: string;

  constructor(
    private projectBoqDataFormService: ProjectBoqDataFormService,
    @Self() private controlContainer: ControlContainer
  ) {
    this._budgetTypes = null;
    this._index = null;
  }

  get formGroup() { return this.controlContainer.control as FormGroup; }
  get index() { return this._index; }
  get budgetTypes() { return this._budgetTypes || [] };

  // template constanct
  get budgetWidth() { return 100; }

  addBudgetIfNeed(name: string) {
    let budgetsFormGroup = this.formGroup.get('budgets') as FormGroup;
    if(!budgetsFormGroup.contains(name)) {
      budgetsFormGroup.addControl(name, this.projectBoqDataFormService.createBudget(name, {budget: '0.00'} as any));
    }
    return name;
  }

  createChild(item?: any) {
    item = item || {
      budgets: this.budgetTypes.reduce((budgets, budgetType: ProjectBoqBudgetType&{_code: string}) => {
        budgets[budgetType._code] = {budget: '0.00'};
        return budgets;
      }, {}),
    };

    return this.projectBoqDataFormService.formCreate(item);
  }

  pushChild(childFormGroup: FormGroup) {
    let formArray = this.formGroup.get('children') as FormArray;
    formArray.push(childFormGroup);
  }

  addNewChild() {
    let item = null;
    let formArray = this.formGroup.get('children') as FormArray;

    if(formArray.controls.length === 0) {
      item = {
        budgets: this.budgetTypes.reduce((budgets, budgetType: ProjectBoqBudgetType&{_code: string}) => {
          budgets[budgetType._code] = {budget: this.formGroup.get('budgets.' + budgetType._code + '.budget').value};
          return budgets;
        }, {}),
      };
    }

    this.pushChild(this.createChild(item));
  }

  removeSelf(formGroup: FormGroup) {
    if(formGroup.parent) {
      let formArray = formGroup.parent as FormArray;

      if((formArray.controls.length > 1) || !(formArray.parent.parent)){
        let budgetsFormGroup = formGroup.get('budgets') as FormGroup;
        this.budgetTypes.map((budgetType: ProjectBoqBudgetType&{_code: string}) => budgetType._code).forEach((budgetCode) => {
          budgetsFormGroup.get(budgetCode + '.budget').setValue(0);
        });
      }

      for(let key in formArray.controls) {
        if(formArray.controls[key] === formGroup) {
          formArray.removeAt(+key);
          break;
        }
      }
    }
  }
}
