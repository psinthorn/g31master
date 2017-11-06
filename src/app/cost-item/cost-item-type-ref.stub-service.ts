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
  ConvertableModelType,
} from '@consol/shared';

import { CostItemTypeRef } from './model';

import { CostItemTypeRefService } from './cost-item-type-ref.service';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export class CostItemTypeRefStubService extends DataStubNewService<CostItemTypeRef>
implements CostItemTypeRefService {
  protected static get serviceName() { return 'cost_item_type_ref'; }
  protected static get modelType() { return CostItemTypeRef as ConvertableModelType<CostItemTypeRef>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  getAll(itemQuery?: {[prop: string]: any}): Observable<CostItemTypeRef[]> {
console.debug('CostItemTypeRefNewService.getAll was called', itemQuery);
    return super.getAll(itemQuery);
  }
}
