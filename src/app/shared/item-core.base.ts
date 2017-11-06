import { Injector, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// RxJS operators
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { ComponentInfoService } from './component-info.service';

import { MetaDataBase } from './model';

export abstract class MetaDataProperty<T> {
  readonly metaData: MetaDataBase<T>;

  static isValid<T>(obj: any): obj is MetaDataProperty<T> {
    return typeof obj.metaData !== 'undefined';
  }
}

export abstract class OperatorsProperty {
  readonly operators: { readonly [operator: string]: () => any};

  static isValid(obj: any): obj is OperatorsProperty {
    return typeof obj.operators !== 'undefined';
  }
}

export abstract class ItemLoadMethod<T> {
  abstract itemLoad(snapshot: ActivatedRouteSnapshot): Observable<MetaDataBase<T>>;

  static isValid<T>(obj: any): obj is ItemLoadMethod<T> {
    return typeof obj.itemLoad !== 'undefined';
  }
}

export abstract class ItemClearMethod {
  abstract itemClear(): void;

  static isValid(obj: any): obj is ItemClearMethod {
    return typeof obj.itemClear !== 'undefined';
  }
}

export abstract class ItemOnReadyMethod {
  abstract itemOnReady(): void;

  static isValid(obj: any): obj is ItemOnReadyMethod {
    return typeof obj.itemOnReady !== 'undefined';
  }
}

export abstract class ItemCreateFormMethod<T> {
  abstract itemCreateForm(item: T): FormGroup;

  static isValid<T>(obj: any): obj is ItemCreateFormMethod<T> {
    return typeof obj.itemCreateForm !== 'undefined';
  }
}

export abstract class ItemSearchMethod {
  abstract itemSearch(): void;

  static isValid(obj: any): obj is ItemSearchMethod {
    return typeof obj.itemSearch !== 'undefined';
  }
}

export abstract class ItemSaveMethod<T> {
  abstract itemSave(item: T): Observable<any>;

  static isValid<T>(obj: any): obj is ItemSaveMethod<T> {
    return typeof obj.itemSave !== 'undefined';
  }
}

export abstract class ItemDeleteMethod {
  abstract itemDelete(): Observable<any>;

  static isValid(obj: any): obj is ItemDeleteMethod {
    return typeof obj.itemDelete !== 'undefined';
  }
}

export abstract class ItemRootBase implements OnInit {
  private _componentInfoService: ComponentInfoService;

  constructor(private _injector: Injector) {
  }

  protected get injector() { return this._injector; }

  get componentInfoService() { return this._componentInfoService; }

  ngOnInit() {
    let ci;
    try{
      // NOTE: must get on OnInit Lifecycle Hook unless it cannot inject correctly
      this._componentInfoService = this.injector.get(ComponentInfoService);
    } catch(excp){
      console.warn('cannot get componentInfoService', excp);
      this._componentInfoService = new ComponentInfoService();
    }
  }
}

export abstract class ItemBasedBase<T>
  extends ItemRootBase
  implements OnInit, OnDestroy,
    MetaDataProperty<T>, OperatorsProperty {
  private _route: ActivatedRoute;

  private data$$: Subscription;

  private reloadSubject: Subject<ActivatedRouteSnapshot>;

  private _metaData: MetaDataBase<T>;
  private _operators: {[operator: string]: () => any};

  constructor(injector: Injector) {
    super(injector);

    this._route = null;

    this.data$$ = null;
    this.reloadSubject = new Subject();

    this._metaData = null;
    this._operators = {};
  }

  protected get route() { return this._route; }

  get metaData() { return this._metaData; }
  get operators() { return this._operators; }

  ngOnInit() {
    super.ngOnInit();

    // NOTE: must get on OnInit Lifecycle Hook unless it cannot inject correctly
    this._route = this.injector.get(ActivatedRoute);

    if(this.data$$) this.data$$.unsubscribe();
    this.data$$ = this._observable()
      .merge(this.reloadSubject)
      .switchMap((snapshot) => {
        this.componentInfoService.setValue({
          label: null,
          loading: true,
          error: null,
        });

        this._itemClear();
        return this._itemLoad(snapshot)
          .catch((error: any) => {
            this.componentInfoService.setValue('error', error);
            return Observable.of({data: null});
          })
        ;
      })
      .subscribe((metaDataModel: MetaDataBase<T>) => {
        this.componentInfoService.setValue('loading', false);
        this._metaData = metaDataModel;
        this._itemReady(metaDataModel.data);
      })
    ;
  }

  ngOnDestroy() {
    if(this.data$$) this.data$$.unsubscribe();
    this.componentInfoService.setValue({
      label: null,
      loading: false,
      error: null,
    });

    this.data$$ = null;
    this._itemClear();
  }

  reload(): void {
    this.reloadSubject.next(this.route.snapshot);
  }

  protected abstract _observable(): Observable<ActivatedRouteSnapshot>;
  protected abstract _itemLoad(snapshot: ActivatedRouteSnapshot): Observable<MetaDataBase<T>>;
  protected abstract _itemReady(item: T): void;
  protected abstract _itemClear(): void;
}
