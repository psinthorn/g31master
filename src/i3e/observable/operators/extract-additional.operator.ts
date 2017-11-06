import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
//import { OperatorFunction } from 'rxjs';

import {
  AdditionalObservable, AdditionalObservableManager,
  additionalObservableDescriptor,
} from '../additional-observable';

export type ExtractAdditionalResult<R> = [R, {[key: string]: any}];
export type ExtractAdditionalFunction<T, R> = (value: T, index: number) => ExtractAdditionalResult<R>;
export type ExtractAdditionalOperatorFunction<T, R> = (value: Observable<T> ) => AdditionalObservable<R>;

export function extractAdditional<T, R>(extract: ExtractAdditionalFunction<T, R>, thisArg?: any): ExtractAdditionalOperatorFunction<T, R> {
  return function extractAdditionalOperation(source: Observable<T>): AdditionalObservable<R> {
    if (typeof extract !== 'function') {
      throw new TypeError('argument is not a function.');
    }

    if(AdditionalObservable.isValid(source)) {
      source.lift(new ExtractAdditionalOperator(extract, thisArg, source.i3eAdditionalObservableManager))
    } else {
      const additionalObservableManager = new AdditionalObservableManager();
      return Object.create(source,
        Object.assign({}, additionalObservableDescriptor, {
          i3eAdditionalObservableManager: { value: additionalObservableManager, writable: false },
          source: { value: source },
          operator: { value: new ExtractAdditionalOperator(extract, thisArg, additionalObservableManager) },
        })
      );
    }

    /*
    const origin = source.lift(new ExtractAdditionalOperator(extract, thisArg, additionalSubjects));

    const additionalObservable = Object.create(origin,
      Object.assign({}, additionalObservableDescriptor, {
        i3eAdditionalSubjects: { value: additionalSubjects, writable: false },
        i3eAdditionalObservables: { value: {}, writable: false },
      })
    );

    return additionalObservable;
    */
  };
}

export class ExtractAdditionalOperator<T, R> implements Operator<T, R> {
  constructor(
    private extract: ExtractAdditionalFunction<T, R>,
    private thisArg: any,
    private additionalObservableManager: AdditionalObservableManager,
  ) { }

  call(subscriber: Subscriber<R>, source: any): any {
    return source.subscribe(new ExtractAdditionalSubscriber(subscriber, this.extract, this.thisArg, this.additionalObservableManager));
  }
}

class ExtractAdditionalSubscriber<T, R> extends Subscriber<T> {
  count: number = 0;
  private thisArg: any;

  constructor(
    destination: Subscriber<R>,
    private extract: ExtractAdditionalFunction<T, R>,
    thisArg: any,
    private additionalObservableManager: AdditionalObservableManager,
  ) {
    super(destination);
    this.thisArg = thisArg || this;
  }

  // NOTE: This looks unoptimized, but it's actually purposefully NOT
  // using try/catch optimizations.
  protected _next(value: T) {
    let result: ExtractAdditionalResult<R>;
    try {
      result = this.extract.call(this.thisArg, value, this.count++);
      Object.keys(result[1]).forEach((key) => {
        this.additionalObservableManager.register(key);
        this.additionalObservableManager.subject(key).next(result[1][key]);
      });
    } catch (err) {
      this.destination.error(err);
      return;
    }
    this.destination.next(result[0]);
  }
}
