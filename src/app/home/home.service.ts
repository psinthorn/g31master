import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions, RequestOptionsArgs,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/map';

import { DataStubNewService } from '@consol/shared/data-stub.new-service';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { Home, HomeDetail } from './model';

const serviceName: string = 'home';

@Injectable()
export class HomeService extends DataStubNewService<Home> {
  protected static get serviceName() { return 'home'; }
  protected static get modelType() { return Home as ConvertableModelType<Home>; }

  constructor(
    http: Http,
    sr: ServerResolverService
  ) {
    super(http, sr);
  }

  get(id: number): Observable<Home> {
console.debug('get value:', id);
    return super.get(id);
  }
}
