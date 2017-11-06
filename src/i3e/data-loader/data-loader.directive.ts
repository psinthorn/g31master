import {
  Directive, OnInit, Output, forwardRef,
  Self, Optional,
  EventEmitter,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConnectableObservable } from 'rxjs/observable/ConnectableObservable';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subscription } from 'rxjs/Subscription';

// RxJS operators
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/publishReplay';

import { ObservableCache } from '../observable-cache';

import { DataLoaderEngine } from './data-loader-engine';
import { DataLoader } from './data-loader';
import { dataLoaderDirectiveName } from './predefine';

export const i3eDataLoaderDirective: any = {
  provide: DataLoader,
  useExisting: forwardRef(() => DataLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }]`,
  providers: [i3eDataLoaderDirective],
})
export class DataLoaderDirective<T>
implements OnInit, DataLoader<T> {
  private loadedParams: any;
  private reloadSubject: Subject<any>;
  private loadSubject: Subject<Observable<T>>;
  private _dataObservable: ConnectableObservable<T>;

  private dataReadyEmitter: EventEmitter<T>;
  private dataRegisterReloadEmitter: EventEmitter<() => void>;

  @Output() get dataReady() { return this.dataReadyEmitter; }
  @Output() get dataRegisterReload() { return this.dataRegisterReloadEmitter; }

  constructor(
    @Self() private engine: DataLoaderEngine<any, T>,
    @Optional() @Self() private cache: ObservableCache<T>,
  ) {
    this.loadedParams = null;
    this.reloadSubject = new Subject<any>();

    this.loadSubject = new ReplaySubject(1);

    this.dataReadyEmitter = new EventEmitter<T>(false);
    this.dataRegisterReloadEmitter = new EventEmitter<any>(false);

    const reloadableObservableFn = () => {
      return this.engine.observable()
        .merge(this.reloadSubject)
        .do((params) => this.loadedParams = params)
        .switchMap((params) => {
          const loader = this.engine.load(params);
          this.loadSubject.next(loader);
          return loader;
        })
      ;
    };

    this._dataObservable = ((this.cache)?
      this.cache.get(reloadableObservableFn)
    :
      reloadableObservableFn()
    )
      .do((data: T) => this.dataReady.emit(data))
      .publishReplay(1)
    ;
  }

  get load$() { return this.loadSubject.asObservable(); }
  get data$() { return this._dataObservable; }

  ngOnInit() {
    this.dataRegisterReloadEmitter.emit(() => {
      this.reload();
    });

    this.data$.connect();
  }

  reload() {
    this.reloadSubject.next(this.loadedParams);
  }
}
