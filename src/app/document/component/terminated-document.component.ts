import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { Document } from '../model';

import { TerminatedDocumentFormService } from '../terminated-document-form.service';

@Component({
  selector: 'cs-document-cancel',
  templateUrl: './terminated-document.component.html',
  styleUrls: ['./terminated-document.component.less'],
})
export class DocumentCancelComponent<T extends Document> {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<T>,
    private formService: TerminatedDocumentFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm();
    });
  }

  itemCreateForm(){
    const form = this.formService.formCreate({type: 'CANCEL'} as any);

    return form;
  }
}

@Component({
  selector: 'cs-document-reject',
  templateUrl: './terminated-document.component.html',
  styleUrls: ['./terminated-document.component.less'],
})
export class DocumentRejectComponent<T extends Document> {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<T>,
    private formService: TerminatedDocumentFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm();
    });
  }

  itemCreateForm(){
    const form = this.formService.formCreate({type: 'REJECT'} as any);

    return form;
  }
}
