import {
  Directive, forwardRef, Input,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// RxJS operator
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

import { ProcessorEngine } from '@i3e/processor';

import { Document, TerminatedDocument } from '../model';

import { FormProcessorEngine, DataLoaderProcessorEngine } from '@consol/shared';

import { DocumentTerminate } from '../document.base-service';

export const csTerminatedDocumentFormRoutingProcessor = {
  provide: ProcessorEngine,
  useExisting: forwardRef(() => TerminatedDocumentFormRoutingProcessorDirective),
  multi: true,
};

@Directive({
  selector: '[csTerminatedDocumentFormRoutingProcessor]',
  providers: [csTerminatedDocumentFormRoutingProcessor],
})
export class TerminatedDocumentFormRoutingProcessorDirective<ET, DS extends DocumentTerminate<ET>>
implements FormProcessorEngine<TerminatedDocument, ET> {
  @Input('dataService') private _dataService: DS;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _processor: DataLoaderProcessorEngine<TerminatedDocument>,
  ) { }

  protected _back() {
    this._location.back();
  }

  protected __replace(info) {
    const navigate = [info.id];
    this._router.navigate(navigate, {
      relativeTo: this._activatedRoute.parent,
      replaceUrl: true,
    });
  }

  readonly save = (data: TerminatedDocument): Observable<ET> => {
    const id = +this._processor.data.id;

    const infoSubject = new ReplaySubject<ET>(1);
    const observable = this._dataService.terminate(id || null, data);
    observable.subscribe((info) => {
      infoSubject.next(info);
      this._back();
      setTimeout(() => this._processor.reload(), 10);
    });

    return infoSubject.asObservable();
  }

  readonly cancel = (): void => {
    this._back();
  }
}
