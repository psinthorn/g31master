import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions, RequestOptionsArgs,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/map';

import {
  ServerResolverService,
  DataService, ConvertableModelType,
} from '@consol/shared';

import { Vendor } from './model';

// Stub Data
import { DataStubService } from '@consol/shared/data-stub.service';

@Injectable()
export class VendorService extends DataStubService<Vendor> {
  protected static get serviceName() { return 'vendor'; }
  protected static get modelType() { return Vendor as ConvertableModelType<Vendor>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  save(id, item) {
    /* stub code */
    if(id === null){
      let num = Math.floor(Math.random() * 10000);
      item.code = 'V' + num;
    }

    return super.save(id, item);
  }
}
