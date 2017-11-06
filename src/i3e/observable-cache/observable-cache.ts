import { Observable } from 'rxjs/Observable';

export abstract class ObservableCache<R> {
  readonly name: string;
  readonly observableFn: () => Observable<R>;
  readonly ready$: Observable<this>;
  abstract get(observableFn: () => Observable<R>):  Observable<R>;

  static isValid<R>(obj: any): obj is ObservableCache<R> {
    return obj
      && (typeof obj.name !== 'undefined')
      && (typeof obj.observableFn !== 'undefined')
      && (typeof obj.ready! !== 'undefined')
      && (typeof obj.get === 'function')
    ;
  }
}

export abstract class ObservableCacheStorage {
  abstract get<R>(cache: ObservableCache<R>): Observable<R>;

  static isValid(obj: any): obj is ObservableCacheStorage {
    return obj && (typeof obj.get === 'function');
  }
}
