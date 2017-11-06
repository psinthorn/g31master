import {
  Input,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { DataGetAll } from '@i3e/data-service';

import { DataSearchableControl } from '@consol/shared';

import { Account } from '../model';

export class AccountSearchableControl<T extends Account>
extends DataSearchableControl<T> {
  private searchSubject: Subject<string>;
  private _items$: Observable<T[]>;

  constructor(
    private _ds: DataGetAll<T[]>,
  ) {
    super();

    this.searchSubject = new Subject<string>();

    this._items$ = this.searchSubject.asObservable()
      .switchMap((value) => {
        if(value === null){
          return Observable.of([] as T[]);
        }

        return (typeof this.dataObservableFn === 'function')?
          this.dataObservableFn(value, this.ds)
        :
          this.ds
            .getAll({ term: value })
            .catch((err) => {
              console.error('data observable error:', err);
              return Observable.of([]);
            })
        ;
      })
    ;
  }

  get ds() { return this._ds; }
  get items$() { return this._items$; }

  protected defaultDisplayFn(item: T) {
    if(item === null) return null;
    if(typeof item === 'string') return item;
    return (item && item.name)? item.name : null;
  };

  writeToControl(obj: T) {
    this.control.setValue(obj);
  }

  protected applyControlValueChange(observable: Observable<any>) {
    observable.subscribe((value) => {
      this.tryUpdateValue(value);
    });
  }

  search(value: string) {
    this.searchSubject.next(value);
  }
}
