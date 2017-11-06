import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Document } from './model';

import { FormService } from '@i3e/form-service';

import { AccountFormService } from '@consol/account';

@Injectable()
export class DocumentFormService extends FormService<Document> {
  constructor(
    fb: FormBuilder,
    private accountFormService: AccountFormService,
  ) {
    super(fb);
  }

  formConfig(item?: Document): {[name: string]: any} {
    item = item || new Document();

    return Object.assign(this.accountFormService.formConfig(item), {});
  }

  formAssignChanges(formGroup: FormGroup): FormGroup {
    this.accountFormService.formAssignChanges(formGroup);

    return formGroup;
  }
}
