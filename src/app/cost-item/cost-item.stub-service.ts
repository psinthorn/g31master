import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions, RequestOptionsArgs,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS static methods
import 'rxjs/add/observable/of';

import { DataContext } from '@i3e';

// RxJS operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import {
  ServerResolverService,
  DataService, ConvertableModelType,
} from '@consol/shared';

import { CostItemTypeRefService } from './cost-item-type-ref.service';

import { CostItem, CostItemTypeRef } from './model';

import { CostItemService } from './cost-item.service';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export class CostItemStubService extends DataStubNewService<CostItem>
implements CostItemService {
  protected static get serviceName() { return 'cost_item'; }
  protected static get modelType() { return CostItem as ConvertableModelType<CostItem>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
    private costItemTypeRefService: CostItemTypeRefService,
  ) {
    super(http, sr);
  }

/*
  protected addReference(dataContext: DataContext<CostItem|CostItem[]>) {
    return this.getAllType().map((types) => {
      if(!dataContext.links) dataContext.links = {};
      dataContext.links['type'] = {uri: null, method: null};

      if(!dataContext.references) dataContext.references = {};
      dataContext.references['type'] = types.reduce((result, data) => {
        result[data.code] = data;
        return result;
      }, {});

      return dataContext;
    });
  }

  getAllType():  Observable<CostItemTypeRef[]> {
    return this.costItemTypeRefService.getAll().map((metaData) => {
      return metaData.data;
    });
  }

  protected hookGet(dataContext: DataContext<CostItem>): Observable<DataContext<CostItem>> {
    return this.addReference(dataContext);
  }
*/
  protected hookGetAll(dataContext: DataContext<CostItem[]>): Observable<DataContext<CostItem[]>> {
    //return this.addReference(dataContext);

    if(!dataContext.links) dataContext.links = [];
    dataContext.links.push('type');

    return Observable.of(dataContext);
  }
}
