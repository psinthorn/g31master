import {
  Component, forwardRef,
  Input, Optional, Self,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor, Validator,

  FormControl,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/// RxJS static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { isObjectEqual } from '@i3e/function';

import { DataLoader } from '@i3e/data-loader';

import { ObservableCache } from '@i3e/observable-cache';

import { DataControl } from '@consol/shared';

import { CostItemTypeRef } from '../model';

import { CostItemTypeRefService } from '../cost-item-type-ref.service';

export const csCostItemTypeRefControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CostItemTypeRefControlComponent),
  multi: true,
};

export const csCostItemTypeRefControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => CostItemTypeRefControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-cost-item-type-ref-control',
  templateUrl: '../template/cost-item-type-ref-control/cost-item-type-ref-control.component.html',
  styleUrls: [ '../template/cost-item-type-ref-control/cost-item-type-ref-control.component.less' ],
  providers: [
    csCostItemTypeRefControlValueAccessor,
    csCostItemTypeRefControlValidators,
  ],
})
export class CostItemTypeRefControlComponent extends DataControl<CostItemTypeRef> {
  private items: CostItemTypeRef[];
  private _items$: Observable<CostItemTypeRef[]>;
  private _defaultObservable: () => Observable<CostItemTypeRef[]>;

  constructor(
    private ds: CostItemTypeRefService,
    @Optional() @Self() private loader: DataLoader<CostItemTypeRef[]>,
    @Optional() @Self() private cache: ObservableCache<CostItemTypeRef[]>,
  ) {
    super();

    this._defaultObservable = () => {
      return this.ds.getAll()
        .catch((err) => {
          console.error('data observable error:', err);
          return Observable.of(null);
        })
      ;
    };

    this._items$ = (this.loader)?
      this.loader.data$
    :
      ((this.cache)? this.cache.get(this.defaultObservable) : this.defaultObservable())
    ;
  }

  get items$() { return this._items$; }
  get defaultObservable() { return this._defaultObservable; }

  writeToControl(obj: CostItemTypeRef): void {
    this.control.setValue((obj)? obj : null);
  }

  protected applyControlValueChange(observable: Observable<any>): void {
    observable.subscribe((value) => {
      this.tryUpdateValue(value);
    });
  }
}
