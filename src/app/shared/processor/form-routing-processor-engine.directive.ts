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

import { DataSave } from '@i3e/data-service';

import { DataLoaderProcessorEngine } from './data-loader-processor-engine';
import { FormProcessorEngine } from './form-processor-engine';

export const csFormRoutingProcessorEngineDirective = {
  provide: ProcessorEngine,
  useExisting: forwardRef(() => FormRoutingProcessorEngineDirective),
  multi: true,
};

export const csFormRoutingFormProcessorEngineDirective = {
  provide: FormProcessorEngine,
  useExisting: forwardRef(() => FormRoutingProcessorEngineDirective),
};

@Directive({
  selector: '[csFormRoutingProcessor]',
  providers: [
    csFormRoutingProcessorEngineDirective,
    csFormRoutingFormProcessorEngineDirective,
  ],
})
export class FormRoutingProcessorEngineDirective<T, ES, DS extends DataSave<T, ES>>
implements FormProcessorEngine<T, ES> {
  @Input('dataService') private _dataService: DS;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _processor: DataLoaderProcessorEngine<T>,
  ) { }

  protected _back() {
    this._location.back();
  }

  protected _replace(info) {
    const navigate = ['..', info.id];
    this._router.navigate(navigate, {
      relativeTo: this._activatedRoute.parent,
      replaceUrl: true,
    });
  }

  readonly save = (data: T): Observable<ES> => {
    const id = +(data as any).id;
    const isNew = !id;

    const infoSubject = new ReplaySubject<ES>(1);
    const observable = this._dataService.save(id || null, data);
    observable.subscribe((info) => {
      infoSubject.next(info);
      if(isNew){
        this._replace(info);
      } else{
        this._back();
        setTimeout(() => this._processor.reload(), 10);
      }
    });

    return infoSubject.asObservable();
  }

  readonly cancel = (): void => {
    this._back();
  }
}
