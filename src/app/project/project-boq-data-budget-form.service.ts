import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { ProjectBoqDataBudget } from './model';

@Injectable()
export class ProjectBoqDataBudgetFormService extends FormService<ProjectBoqDataBudget> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: ProjectBoqDataBudget): {[name: string]: any} {
    item = item || new ProjectBoqDataBudget();

    return {
      id: [item.id || null, []],
      budget: [item.budget || null, [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
