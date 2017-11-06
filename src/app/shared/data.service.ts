import { Observable } from 'rxjs/Observable';

import { MetaDataBase } from './model';

export abstract class DataGetAll<T> {
  abstract getAll(itemQuery?: {[prop: string]: any}): Observable<MetaDataBase<T[]>>;

  static isValid<T>(obj: any): obj is DataGetAll<T> {
    return typeof obj.getAll === 'function';
  }
}

export abstract class DataGet<T> {
  abstract get(id: number): Observable<MetaDataBase<T>>;

  static isValid<T>(obj: any): obj is DataGet<T> {
    return typeof obj.get === 'function';
  }
}

export abstract class DataSave<T> {
  abstract save(id: number, data: T): Observable<any>;

  static isValid<T>(obj: any): obj is DataSave<T> {
    return typeof obj.save === 'function';
  }
}

export abstract class DataDelete<T> {
  abstract delete(id: number): Observable<any>;

  static isValid<T>(obj: any): obj is DataDelete<T> {
    return typeof obj.delete === 'function';
  }
}

export type DataServiceMethod<T> = DataGetAll<T>|DataGet<T>|DataSave<T>|DataDelete<T>;

export abstract class DataServiceProperty<T> {
  readonly dataService: DataServiceMethod<T>;

  static isValid<T>(obj: any): obj is DataServiceProperty<T> {
    return obj && (typeof obj.dataService !== 'undefined');
  }
}

export abstract class DataService<T>
  implements DataGetAll<T>, DataGet<T>,  DataSave<T>, DataDelete<T> {
  abstract getAll(itemQuery?: {[prop: string]: any}): Observable<MetaDataBase<Array<T>>>;
  abstract get(id: number): Observable<MetaDataBase<T>>;
  abstract save(id: number, data: T): Observable<any>;
  abstract delete(id: number): Observable<any>;
}

export type DataObservableFunction<T> = (term: string, ds?: DataGetAll<T>) => Observable<T[]>;
