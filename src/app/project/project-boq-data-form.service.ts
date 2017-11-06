import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { ProjectBoqDataBudgetFormService } from './project-boq-data-budget-form.service';

import {
  ProjectBoqData,
  ProjectBoqBudgetType,
  ProjectBoqDataBudget,
} from './model';

@Injectable()
export class ProjectBoqDataFormService extends FormService<ProjectBoqData> {
  constructor(
    fb: FormBuilder,
    private boqDataBudgetFormService: ProjectBoqDataBudgetFormService,
  ) {
    super(fb);
  }

  formConfig(item?: ProjectBoqData): {[name: string]: any} {
    item = item || new ProjectBoqData();

    let data: {[key: string]: ProjectBoqDataBudget};
    return {
      id: [item.id || null, []],
      name: [item.name || null, [Validators.required]],
      children: this.fb.array((item.children || []).map((data) => this.formBuild(data))),
      budgets: this.fb.group(Object.keys(data = item.budgets || {}).reduce((result, key) => {
        result[key] = this.boqDataBudgetFormService.formBuild(data[key]);
        return result;
      }, {})),
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    const budgetsFormGroup: FormGroup = formGroup.get('budgets') as FormGroup;
    Object.keys(budgetsFormGroup.controls).forEach((name) => {
      const budgetFormGroup: FormGroup = budgetsFormGroup.controls[name] as FormGroup;
      this.budgetAssignChanges(name, budgetFormGroup);
    });

    return formGroup;
  }

  private budgetAssignChanges(name: string, budgetFormGroup: FormGroup): FormGroup {
    budgetFormGroup.get('budget').valueChanges.subscribe((value) => {
      if(budgetFormGroup.parent.parent.parent) {
        let boqFormArray = budgetFormGroup.parent.parent.parent;
        let sum = Object.keys(boqFormArray.controls).reduce((sum, index) => {
          return sum + +boqFormArray.controls[index].get('budgets.' + name + '.budget').value;
        }, 0);
        boqFormArray.parent.get('budgets.' + name + '.budget').setValue(sum.toFixed(2));
      }
    });

    return budgetFormGroup;
  }

  createBudget(name: string, item?: ProjectBoqDataBudget) {
    const budgetFormGroup = this.boqDataBudgetFormService.formCreate(item);
    this.budgetAssignChanges(name, budgetFormGroup);

    return budgetFormGroup;
  }
}
