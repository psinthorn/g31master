import {
  Component, EventEmitter, forwardRef,
  Output,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR, NG_VALIDATORS,
} from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJs static method
import 'rxjs/add/observable/of';

// RxJS operator
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import { SearchableDataControl } from '../searchable-data-control';

export const csSearchableArrayControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchableArrayControlComponent),
  multi: true,
};

export const csSearchableArrayControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SearchableArrayControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-searchable-array-control',
  templateUrl: './searchable-array-control.component.html',
  styleUrls: ['./searchable-array-control.component.less'],
  providers: [csSearchableArrayControlValueAccessor, csSearchableArrayControlValidators],
})
export class SearchableArrayControlComponent<T>
extends SearchableDataControl<T[]> {
  @Output('searchChange') private searchChangeEmitter: EventEmitter<string>;
  constructor() {
    super();

    this.searchChangeEmitter = new EventEmitter<string>();
  }

  writeToControl(obj: T[]) {
    //this.control.setValue(null);
  }

  protected applyControlValueChange(observable: Observable<any>) {
    let lastSearchValue = null;
    observable
      .switchMap((value) => {
console.debug('control value:', value);
        if(typeof value === 'object'){
          this.tryAddValue(value);
          return Observable.of(null);
        }

        if(this.freeEnter) this.tryAddValue(value);

        return Observable.of(value)
          .filter((value) => (value && (value.length >= this.minTypeLength)))
          .debounceTime(this.debounceTime)
          .filter((value) => (value && (value !== lastSearchValue)))
        ;
      })
      .subscribe((value) => {
        lastSearchValue = value;
        this.searchChangeEmitter.emit(value);
      })
    ;
  }

  protected tryAddValue(value: T): void {
    if(this.value && !!value) {
      this.value.push(value);
      //this.tryUpdateValue();
    }
  }

  protected tryUpdateValue(value?: T[]): void {
    // for array not need to bubble update
  }

  reset(ev: any) {
    setTimeout(() => {
      this.clear({input: ev.target});
    }, 100);
  }

  clear(ev?: {input: any}) {
    this.control.setValue(null);
    if(ev && ev.input) ev.input.value = '';
  }

  remove(item: T) {
    const index = this.value.findIndex((value) => {
      return !this.isNewValue(item, value);
    });

    if (index >= 0) {
      this.value.splice(index, 1);
      this.tryUpdateValue();
    }
  }
}
