// TODO: remove
/*
import {
  Directive, forwardRef, Input,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { DataDelete } from '@i3e/data-service';

import { capitalize } from '@i3e/function';

import {
  Processor,
} from '@i3e/processor';

import {
  ApparentDescription,
  ContextProcessorDirective,
} from '@consol/shared';

import { Document } from '../model';

import { DocumentReplace } from '../document.base-service';

export const predefineDocumentApparentDescriptions: {[key: string]: ApparentDescription} = {
  replace: { icon: 'edit', color: 'warn' },
  cancel: { icon: 'delete_forever', color: 'warn' },
  reject: { icon: 'delete_forever', color: 'warn' },
};

@Directive({
  selector: `[csDocumentContextEngine]`,
})
export class DocumentContextProcessorDirective<T extends Document, ED, DS extends DataDelete<ED> & DocumentReplace<T>> {
  @Input('dataService') private _dataService: DS;

  constructor(
    private contextProcessorEngine: ContextProcessorDirective<T, ED, DS>,
  ) {
    contextProcessorEngine.processorReady$.subscribe((processor) => {
      processor.actions.forEach((action) => {
        Object.assign(action, predefineDocumentApparentDescriptions[action.name]);
      });
    });
  }

  protected get dataService() { return this._dataService; }
}
*/
