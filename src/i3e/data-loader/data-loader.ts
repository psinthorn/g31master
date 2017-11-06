import { Observable } from 'rxjs/Observable';

export abstract class DataLoader<T> {
  readonly load$: Observable<Observable<T>>;
  readonly data$: Observable<T>;
  abstract reload(): void;

  static isValid<T>(obj: any): obj is DataLoader<T> {
    return obj
      && (typeof obj.load$ !== 'undefined')
      && (typeof obj.data$ !== 'undefined')
      && (typeof obj.reload === 'function')
    ;
  }
}
