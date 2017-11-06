import {
  Component, forwardRef,
  Input,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, NG_VALIDATORS,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { SearchableDataControl } from '@consol/shared';

import { Home } from './model';

import { HomeService } from './home.service';

export function homeDisplayFn(item: Home) {
  if(item === null) return null;
  if(typeof item === 'string') return item;
  return (item && item.firstname)? item.firstname : null;
};

export const csHomeControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HomeControlComponent),
  multi: true,
};

export const csHomeControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => HomeControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-home-control',
  templateUrl: './home-control.component.html',
  styleUrls: ['./home-control.component.less'],
  providers: [csHomeControlValueAccessor, csHomeControlValidators],
})
export class HomeControlComponent extends SearchableDataControl<Home> {
  private searchSubject: Subject<string>;
  private _items$: Observable<Home[]>;

  @Input('dataObservableWith') private _dataObservableFn: Function;
  @Input('displayWith') private _displayFn: Function;

  constructor(
    private ds: HomeService,
  ) {
    super();

    this.searchSubject = new Subject<string>();

    this._items$ = this.searchSubject.asObservable()
      .switchMap((value) => {
        if(value === null){
          return Observable.of([] as Home[]);
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

  get items$() { return this._items$; }

  get dataObservableFn() { return this._dataObservableFn; }
  get displayFn() { return this._displayFn || homeDisplayFn }

  writeToControl(obj: Home) {
    this.control.setValue(obj);
  }

  protected applyControlValueChange(observable: Observable<Home>) {
    observable.subscribe((value) => {
      this.tryUpdateValue(value);
    })
  }

  search(value: string) {
    this.searchSubject.next(value);
  }
}
