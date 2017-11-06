import {
  Directive, forwardRef, Output,
  EventEmitter,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/filter';

import { ProcessorEngine } from '@i3e/processor';

import { FormProcessorEngine } from './form-processor-engine';

export const csFormSimpleProcessorEngineDirective = {
  provide: ProcessorEngine,
  useExisting: forwardRef(() => FormSimpleProcessorEngineDirective),
  multi: true,
};

export const csFormSimpleFormProcessorEngineDirective = {
  provide: FormProcessorEngine,
  useExisting: forwardRef(() => FormSimpleProcessorEngineDirective),
};

@Directive({
  selector: '[csFormSimpleProcessor]',
  providers: [
    csFormSimpleProcessorEngineDirective,
    csFormSimpleFormProcessorEngineDirective,
  ],
})
export class FormSimpleProcessorEngineDirective<T>
implements FormProcessorEngine<T, T> {
  @Output('save') private saveEmitter: EventEmitter<T>;

  constructor(
  ) {
    this.saveEmitter = new EventEmitter<T>();
  }

  readonly save = (data: T): Observable<T> => {
    this.saveEmitter.emit(data);
    return Observable.of(data);
  }

  readonly cancel = (): void => {
    this.saveEmitter.emit(null);
  }
}
