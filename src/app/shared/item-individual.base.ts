import { Injector } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// RxJS operators
import 'rxjs/add/operator/map';

import { DataService } from './data.service';

import { MetaDataBase } from './model';

import {
  ItemBasedBase,
  ItemLoadMethod, ItemOnReadyMethod, ItemClearMethod,
  ItemSaveMethod, ItemDeleteMethod
} from './item-core.base';

export abstract class ItemReferenceCodeProperty {
  readonly refCode: string;

  static isValid(obj: any): obj is ItemReferenceCodeProperty {
    return typeof obj.refCode !== 'undefined';
  }
}

export abstract class ItemIsNewCheckerMethod {
  abstract itemIsNewChecker(snapshot: ActivatedRouteSnapshot): boolean;

  static isValid(obj: any): obj is ItemIsNewCheckerMethod {
    return typeof obj.itemIsNewChecker === 'function';
  }
}

export abstract class ItemIndividualBase<T>
  extends ItemBasedBase<T> {
  private _item$: Observable<T>
  private _isNew: boolean;

  private _location: Location;
  private _router: Router;

  private dataSubject: BehaviorSubject<T>;

  private _save$: Function;
  private _delete$: Function;

  constructor(
    injector: Injector,
    private _ds: DataService<T>
  ) {
    super(injector);

    this.dataSubject = new BehaviorSubject(null);

    this._item$ = this.dataSubject.asObservable();
    this._isNew = true;

    this._location = null;
    this._router = null;

    this._save$ = (item: T) => this._itemSave(item);
    this._delete$ = () => this._itemDelete();
  }

  protected get ds() { return this._ds; }
  protected get location() { return this._location; }
  protected get router() { return this._router; }

  get item$() { return this._item$; }
  get isNew() { return this._isNew; }

  get save$() { return this._save$; }
  get delete$() { return this._delete$; }

  ngOnInit() {
    super.ngOnInit();

    this._location = this.injector.get(Location);
    this._router = this.injector.get(Router);
  }

  protected _observable(): Observable<ActivatedRouteSnapshot> {
    return this.route.params
      .map((obj) => this.route.snapshot)
    ;
  }

  protected _itemLoad(snapshot: ActivatedRouteSnapshot): Observable<MetaDataBase<T>> {
    let id = +[snapshot.params['id']] || null;
    let self = this;
    if(ItemIsNewCheckerMethod.isValid(this)) {
      self._isNew = this.itemIsNewChecker(snapshot);
    } else {
      this._isNew = (id === null);
    }

    if(ItemLoadMethod.isValid<T>(this)){
      return this.itemLoad(snapshot);
    } else{
      return this.ds.get(id);
    }
  }

  protected _itemReady(item: T): void {
    this.dataSubject.next(item);
    if(ItemOnReadyMethod.isValid(this)) this.itemOnReady();
  }

  protected _itemClear(): void {
    this.dataSubject.next(null);
    if(ItemClearMethod.isValid(this)) this.itemClear();
  }

  protected _itemSave(item): Observable<any>{
    if(ItemSaveMethod.isValid<T>(this)){
      return this.itemSave(item);
    } else{
      let id = +[this.route.snapshot.params['id']] || null;
      return this.ds.save(id, item);
    }
  }

  protected _itemDelete(): Observable<any>{
    if(ItemDeleteMethod.isValid(this)){
      return this.itemDelete();
    } else{
      let id = +[this.route.snapshot.params['id']] || null;
      return this.ds.delete(id);
    }
  }

  ngOnDestroy(){
    this.dataSubject.complete();
    super.ngOnDestroy();
  }

  replace(obj): void {
    let navigate = [obj.id];
    this.router.navigate(navigate, {
      relativeTo: this.route.parent,
      replaceUrl: true,
    });
  }

  back(): void {
    this.location.back();
  }
}
