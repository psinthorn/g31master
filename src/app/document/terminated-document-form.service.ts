import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TerminatedDocument } from './model';

import { FormService } from '@i3e/form-service';

@Injectable()
export class TerminatedDocumentFormService extends FormService<TerminatedDocument> {
  constructor(
    fb: FormBuilder,
  ) {
    super(fb);
  }

  formConfig(item?: TerminatedDocument): {[name: string]: any} {
    item = item || new TerminatedDocument();

    return {
      id: [item.id || null],
      type: [item.type || null, [Validators.required]],
      description: [item.description || null, [Validators.required]],
    };
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    return formGroup;
  }
}
