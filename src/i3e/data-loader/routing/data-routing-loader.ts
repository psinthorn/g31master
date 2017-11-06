import { OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataLoaderEngine } from '../data-loader-engine';

export abstract class DataRoutingLoader<O, T, E>
implements DataLoaderEngine<O, T>, OnInit {
  @Input('dataService') private _dataService: E;

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  protected get activatedRoute() { return this._activatedRoute; }
  protected get dataService() { return this._dataService; }

  ngOnInit() {
    if(!this.dataService) throw new Error(`${ this.constructor.name } requires dataService property`);
  }

  abstract observable(): Observable<O>;
  abstract load(params: O): Observable<T>;
}
