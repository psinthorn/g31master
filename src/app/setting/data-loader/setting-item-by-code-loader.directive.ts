import {
  Directive, forwardRef, Input,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';

// RxJS operator
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

import {
  dataLoaderDirectiveName,
  DataLoaderEngine,
} from '@i3e/data-loader';

import { Setting } from '../model';

import { SettingService } from '../setting.service';

export const i3eSettingItemBycodeLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => SettingItemByCodeLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="csSettingItemByCode"]`,
  providers: [ i3eSettingItemBycodeLoaderEngine ],
})
export class SettingItemByCodeLoaderDirective<T extends Setting>
implements DataLoaderEngine<string, T> {
  private codeSubject: Subject<string>

  @Input('code') private set code(value) {
    this.codeSubject.next(value);
  }

  constructor(
    private dataService: SettingService<Setting>,
  ) {
    this.codeSubject = new ReplaySubject<string>(1);
  }

  observable(): Observable<string> {
    return this.codeSubject.asObservable().distinctUntilChanged();
  }

  load(code: string): Observable<T> {
    return this.dataService.getByCode(code);
  }
}
