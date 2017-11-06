import {
  Directive, forwardRef,
  Input, OnInit,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';

// RxJS operator
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/publishReplay';

import { observableCacheStorageDirectiveName } from './predefine';

import { ObservableCache, ObservableCacheStorage } from './observable-cache';

export const i3eObservableCacheStorage: any = {
  provide: ObservableCacheStorage,
  useExisting: forwardRef(() => ObservableCacheStorageDirective),
};

@Directive({
  selector: `[${ observableCacheStorageDirectiveName }]`,
  providers: [i3eObservableCacheStorage],
})
export class ObservableCacheStorageDirective implements ObservableCacheStorage {
  private caches: {[key: string]: ConnectableObservable<any>}
  constructor() {
    this.caches = {};
  }

  get<R>(cache: ObservableCache<R>): Observable<R> {
    return cache.ready$.switchMap((cache) => {
      if(typeof this.caches[cache.name] === 'undefined') {
        this.caches[cache.name] = cache.observableFn().publishReplay(1);
        this.caches[cache.name].connect();
      }

      return this.caches[cache.name];
    });
  }
}
