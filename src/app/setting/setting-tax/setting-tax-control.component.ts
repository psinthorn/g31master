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

import { SettingTax } from '../model';

import { SettingTaxService } from './setting-tax.service';

export const csSettingTaxControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SettingTaxControlComponent),
  multi: true,
};

export const csSettingTaxControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SettingTaxControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-setting-tax-control',
  templateUrl: './setting-tax-control.component.html',
  styleUrls: [ './setting-tax-control.component.less' ],
  providers: [
    csSettingTaxControlValueAccessor,
    csSettingTaxControlValidators,
  ],
  exportAs: 'csSettingTaxControl',
})
export class SettingTaxControlComponent extends DataControl<number> {
  private _items$: Observable<number[]>;
  private items: SettingTax[];
  private _defaultObservable: () => Observable<number[]>;

  constructor(
    private dataService: SettingTaxService,
    @Optional() @Self() private loader: DataLoader<number[]>,
    @Optional() @Self() private cache: ObservableCache<number[]>,
  ) {
    super();

    this._defaultObservable = () => {
      return this.dataService.getByCode('TAX')
        .catch((err) => {
          console.error('data observable error:', err);
          return Observable.of(null as SettingTax);
        })
        .map((item) => item.taxs)
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

  writeToControl(obj: number): void {
    this.control.setValue(obj || null);
  }

  protected applyControlValueChange(observable: Observable<any>): void {
    observable.subscribe((value) => {
      this.tryUpdateValue(value);
    });
  }
}
