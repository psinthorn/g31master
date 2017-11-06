import { Observable } from 'rxjs/Observable';

export abstract class DataGet<T> {
  abstract get(id: number|Observable<number>): Observable<T>;

  static isValid<T>(obj: any): obj is DataGet<T> {
    return obj && typeof obj.get === 'function';
  }
}

export abstract class DataGetAll<T> {
  abstract getAll(itemQuery?: {[prop: string]: any}|Observable<{[prop: string]: any}>): Observable<T>;

  static isValid<T>(obj: any): obj is DataGetAll<T> {
    return obj && typeof obj.getAll === 'function';
  }
}

export abstract class DataSave<T, E> {
  abstract save(id: number, data: T): Observable<E>;

  static isValid<T, E>(obj: any): obj is DataSave<T, E> {
    return obj && typeof obj.save === 'function';
  }
}

export abstract class DataDelete<T> {
  abstract delete(id: number): Observable<T>;

  static isValid<T>(obj: any): obj is DataDelete<T> {
    return obj && typeof obj.delete === 'function';
  }
}

export abstract class DataServiceProperty<T> {
  readonly dataService: T;

  static isValid<T>(obj: any): obj is DataServiceProperty<T> {
    return obj && (typeof obj.dataService !== 'undefined');
  }
}

export abstract class DataService<T, EG, EGS, ES, ED>
implements DataGet<EG>, DataGetAll<EGS>,  DataSave<T, ES>, DataDelete<ED> {
  abstract get(id: number): Observable<EG>;
  abstract getAll(itemQuery?: {[prop: string]: any}): Observable<EGS>;
  abstract save(id: number, data: T): Observable<ES>;
  abstract delete(id: number): Observable<ED>;
}

export type DataObservableFunction<T> = (term: string, ds?: DataGetAll<any>) => Observable<T[]>;
