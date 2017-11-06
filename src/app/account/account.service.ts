import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS static methods
import 'rxjs/add/observable/of';

// RxJS operators
import 'rxjs/add/operator/map';

import {
  ServerResolverService,
  DataService, ConvertableModelType,
} from '@consol/shared';

import { Account } from './model';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export class AccountService extends DataStubNewService<Account> {
  protected static get serviceName() { return 'account'; }
  protected static get modelType() { return Account as ConvertableModelType<Account>; }

  constructor(
    http: Http,
    sr: ServerResolverService
  ) {
    super(http, sr);
  }
}
