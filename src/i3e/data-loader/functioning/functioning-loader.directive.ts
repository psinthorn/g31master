import {
  Directive, forwardRef, Input,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import { dataLoaderDirectiveName } from '../predefine';

import { DataLoaderEngine } from '../data-loader-engine';

export const i3eFuncitoningLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => FunctioningLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="functioning"]`,
  providers: [ i3eFuncitoningLoaderEngine ],
})
export class FunctioningLoaderDirective<T>
implements DataLoaderEngine<T, T> {
  private observableWithSubject: Subject<Function>;

  @Input('observableWith') private set observableWIth(observableFn: Function) {
    this.observableWithSubject.next(observableFn);
  };

  constructor() {
    this.observableWithSubject = new ReplaySubject<Function>(1);
  }

  observable(): Observable<T> {
    return this.observableWithSubject.asObservable()
      .distinctUntilChanged()
      .switchMap((observableWith) => observableWith())
    ;
  }

  load(data: T): Observable<T> {
    return Observable.of(data);
  }
}
