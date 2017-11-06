import {
  Component, EventEmitter, forwardRef,
  Output, Input,
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

export const csSearchableItemControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchableItemControlComponent),
  multi: true,
};

export const csSearchableItemControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SearchableItemControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-searchable-item-control',
  templateUrl: './searchable-item-control.component.html',
  styleUrls: ['./searchable-item-control.component.less'],
  providers: [csSearchableItemControlValueAccessor, csSearchableItemControlValidators],
  exportAs: 'csSearchableItemControl',
})
export class SearchableItemControlComponent<T>
extends SearchableDataControl<T> {
  @Output('searchChange') private searchChangeEmitter: EventEmitter<string>;

  @Input('newTemplate') private _newTemplate: any;

  private newTemplateHandler: {close: Function};

  constructor() {
    super();

    this.searchChangeEmitter = new EventEmitter<string>();
    this._newTemplate = null;
    this.newTemplateHandler = null;
  }

  get newTemplate() { return this._newTemplate; }

  writeToControl(obj: T) {
    this.control.setValue(obj);
  }

  protected applyControlValueChange(observable: Observable<any>) {
    let lastSearchValue = null;
    observable
      .switchMap((value) => {
        if(typeof value === 'object'){
          this.tryUpdateValue(value);
          return Observable.of(null);
        }

        if(this.freeEnter) this.tryUpdateValue(value);

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

  reset() {
    if(!this.freeEnter) setTimeout(() => {
      this.control.setValue(this.value);
    }, 200);
  }

  clear() {
    this.control.setValue(null);
  }

  setNewTemplateHandler(handler: {close: Function}) {
    this.newTemplateHandler = handler;
  }

  createValue(data: T) {
    if(data !== null) this.writeToControl(data);
    this.newTemplateHandler.close();
  }
}
