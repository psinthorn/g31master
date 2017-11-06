import { Subscriber } from 'rxjs/Subscriber';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Operator } from 'rxjs/Operator';
import { TeardownLogic } from 'rxjs/Subscription';

// RxJS add operator
import 'rxjs/add/operator/map';

export class AdditionalObservableManager {
  private subjects: {[key: string]: ReplaySubject<any>};
  private observables: {[key: string]: Observable<any>};

  constructor() {
    this.subjects = {};
    this.observables = {};
  }

  register<R>(name: string) {
    if(!this.subjects[name]) {
      this.subjects[name] = new ReplaySubject<any>(1);
      this.observables[name] = this.subjects[name].asObservable();
    }
  }

  subject<R>(name: string): Subject<R> {
    this.register(name);
    return this.subjects[name];
  }

  observable<R>(name: string): Observable<R> {
    this.register(name);
    return this.observables[name];
  }

  operate<S>(name: string, operator: string, ...args): Observable<S> {
    const origin = this.observable(name);
    return this.observable[name] = origin[operator].apply(origin, args);
  }
}

export class AdditionalObservable<T> extends Observable<T> {
  constructor(
    subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic,
    readonly i3eAdditionalObservableManager?: AdditionalObservableManager,
  ) {
    super(subscribe);

    if(!this.i3eAdditionalObservableManager) {
      this.i3eAdditionalObservableManager = new AdditionalObservableManager();
    }
  }

  lift<R>(operator: Operator<T, R>): AdditionalObservable<R> {
    return Object.create(this, {
      source: { value: this, writable: true },
      operator: { value: operator, writable: true },
    })
  }

  additionalSubscribe(name: string, next?: (value: any) => void) {
    return this.i3eAdditionalObservableManager.observable(name).subscribe(next);
  }

  additionalObservable<R>(name: string): Observable<R> {
    return this.i3eAdditionalObservableManager.observable(name);
  }

  additionalOperate<S>(name: string, operator: string, ...args): Observable<S> {
    const manager = this.i3eAdditionalObservableManager;
    return this.i3eAdditionalObservableManager.operate.apply(manager, [].concat(name, operator, args));
  }

  static isValid<T>(obj: any): obj is AdditionalObservable<T> {
    return obj
      && (typeof obj.additionalSubscribe === 'function')
      && (typeof obj.additionalObservable === 'function')
      && (typeof obj.additionalOperate === 'function')
    ;
  }
}

const additionalObservableProto = AdditionalObservable.prototype;

export const additionalObservableDescriptor: PropertyDescriptorMap = {
  //i3eAdditionalSubjects: { value: {}, writable: false },
  //i3eAdditionalObservables: { value: {}, writable: false },
  lift: { value: additionalObservableProto.lift },
  additionalSubscribe: { value: additionalObservableProto.additionalSubscribe },
  additionalObservable: { value: additionalObservableProto.additionalObservable },
  additionalOperate: { value: additionalObservableProto.additionalOperate },
};
