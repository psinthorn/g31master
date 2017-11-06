import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { FormService } from '@i3e/form-service';

import { ProjectBoqBudgetType } from './model';

@Injectable()
export class ProjectBoqBudgetTypeFormService extends FormService<ProjectBoqBudgetType> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: ProjectBoqBudgetType): {[name: string]: any} {
    item = item || new ProjectBoqBudgetType();

    return {
      id: [item.id || null, []],
      _code: [item.code || `${(new Date()).getTime()}::${Math.floor(Math.random() * 1000)}`, []],
      code: [item.code || null, [Validators.required]],
      name: [item.name || null, [Validators.required]]
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
