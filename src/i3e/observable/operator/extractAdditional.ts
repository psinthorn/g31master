import { Observable } from 'rxjs/Observable';

import { AdditionalObservable } from '../additional-observable';

import {
  extractAdditional as higherOrder,
  ExtractAdditionalFunction,
} from '../operators';

export function extractAdditional<T, R>(this: Observable<T>, extract: ExtractAdditionalFunction<T, R>, thisArg?: any): AdditionalObservable<R> {
  return higherOrder(extract, thisArg)(this);
}
