import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// RxJS operators
import 'rxjs/add/operator/debounceTime';

import { GlobalState } from './global-state';

@Injectable()
export class GlobalStateService {
  private _globalState: GlobalState;
  private globalStateSubject: Subject<any>;
  private globalStateTemp: object;

  constructor() {
    this._globalState = {
      loading: false,
      enableSearchTerm: false
    };
console.debug('--------------------- GlobalStateService created!!!');
    this.globalStateTemp = {};

    this.globalStateSubject = new Subject();
    this.globalStateSubject
      .asObservable()
      .debounceTime(10)
      .subscribe((values) => {
        Object.assign(this._globalState, values);
        this.globalStateTemp = {};
      })
    ;
  }

  setValue(key: string|object, value?: any) {
    let values: object = {};
    if(typeof key === 'string'){
      values[key] = value;
    } else{
      values = key;
    }

    Object.assign(this.globalStateTemp, values);
    this.globalStateSubject.next(this.globalStateTemp);
  }

  get globalState() { return this._globalState; }
}
