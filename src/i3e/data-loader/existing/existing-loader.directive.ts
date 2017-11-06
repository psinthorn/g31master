import {
  Directive, forwardRef, Input,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/distinctUntilChanged';

import { isObjectEqual } from '@i3e/function';

import { dataLoaderDirectiveName } from '../predefine';

import { DataLoaderEngine } from '../data-loader-engine';

export const i3eExistingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => ExistingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="existing"]`,
  providers: [ i3eExistingLoaderEngine ],
})
export class ExistingLoaderDirective<T>
implements DataLoaderEngine<T, T> {
  private dataSubject: Subject<T>;

  @Input('existingData') set existingData(data: T) {
    this.dataSubject.next(data);
  }

  constructor() {
    this.dataSubject = new ReplaySubject<T>(1);
  }

  observable(): Observable<T> {
    return this.dataSubject.asObservable().distinctUntilChanged(isObjectEqual);
  }

  load(data: T): Observable<T> {
    return Observable.of(data);
  }
}
