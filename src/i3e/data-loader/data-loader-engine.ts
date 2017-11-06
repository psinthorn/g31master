import { Observable } from 'rxjs/Observable';

export abstract class DataLoaderEngine<O, T> {
  abstract observable(): Observable<O>;
  abstract load(params: O): Observable<T>;

  static isValid<O, T>(obj: any): obj is DataLoaderEngine<O, T> {
    return obj
      && (typeof obj.observable === 'function')
      && (typeof obj.load === 'function')
    ;
  }
}
