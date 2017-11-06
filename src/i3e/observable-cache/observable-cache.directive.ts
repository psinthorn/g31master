import {
  Directive, forwardRef,
  Input, OnInit,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { observableCacheDirectiveName } from './predefine';

import { ObservableCache, ObservableCacheStorage } from './observable-cache';

export const i3eObservableCache: any = {
  provide: ObservableCache,
  useExisting: forwardRef(() => ObservableCacheDirective),
};

@Directive({
  selector: `[${ observableCacheDirectiveName }]`,
  providers: [i3eObservableCache],
})
export class ObservableCacheDirective<R> implements ObservableCache<R>, OnInit {
  private thisSubject: Subject<this>;

  @Input(observableCacheDirectiveName) private _name: string;

  private _observableFn: () => Observable<R>;

  constructor(
    private storage: ObservableCacheStorage,
  ) {
    this._name = null;

    this.thisSubject = new ReplaySubject(1);
  }

  get name() { return this._name; }
  get observableFn() { return this._observableFn; }

  ngOnInit() {
    if(!this.name) throw new Error(`${ this.constructor.name } requires name property`);

    this.thisSubject.next(this);
  }

  get(observableFn: () => Observable<R>):  Observable<R> {
    this._observableFn = observableFn;
    return this.storage.get(this);
  }

  get ready$() {
    return this.thisSubject.asObservable();
  }
}
