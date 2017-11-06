import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { ProjectBoqBudgetTypeFormService } from './project-boq-budget-type-form.service';
import { ProjectBoqDataFormService } from './project-boq-data-form.service';

import {
  ProjectBoq,
  ProjectBoqBudgetType,
  ProjectBoqDataBudget,
  ProjectBoqData,
} from './model';

@Injectable()
export class ProjectBoqFormService extends FormService<ProjectBoq> {
  constructor(
    fb: FormBuilder,
    private boqDataFormService: ProjectBoqDataFormService,
    private boqBudgetTypeFormService: ProjectBoqBudgetTypeFormService,
  ) {
    super(fb);
  }

  formConfig(item?: ProjectBoq): {[name: string]: any} {
    item = item || new ProjectBoq();

    return Object.assign(this.boqDataFormService.formConfig(item), {
      project: [item.project || null, [Validators.required]],
      budgetTypes: this.fb.array((item.budgetTypes || [null]).map((data) => {
        return this.boqBudgetTypeFormService.formBuild(data);
        //return this.createBudgetType(data);
      }), Validators.required),
    });
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.boqDataFormService.formAssignChanges(formGroup);
    (formGroup.get('budgetTypes') as FormArray).controls.forEach((fg: FormGroup) => {
      this.boqBudgetTypeFormService.formAssignChanges(fg);
    });

    return formGroup;
  }

  createBudgetType(item?: ProjectBoqBudgetType) {
    return this.boqBudgetTypeFormService.formCreate(item);
  }

  createChild(item?: ProjectBoqData) {
    return this.boqDataFormService.formCreate(item);
  }

  createBudget(name: string, item?: ProjectBoqDataBudget) {
    return this.boqDataFormService.createBudget(name, item);
  }
}
