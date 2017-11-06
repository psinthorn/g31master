import { Observable } from 'rxjs/Observable';

import { AdditionalObservable } from '../additional-observable';

import {
  prepareAdditional as higherOrder,
} from '../operators';

export function prepareAdditional<R>(): AdditionalObservable<R> {
  return higherOrder()(this);
}
