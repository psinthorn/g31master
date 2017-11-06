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

import { Person } from './model';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export abstract class PersonBaseService<T extends Person> extends DataStubNewService<T> {
  protected static get serviceName() { return 'person'; }
  protected static get modelType() { return Person as ConvertableModelType<Person>; }

  protected abstract listFilter(data: T): boolean;

  constructor(
    http: Http,
    sr: ServerResolverService
  ) {
    super(http, sr);
  }

  getAll(itemQuery?) {
    return super.getAll(itemQuery)
      .map((data) => {
        data = data.filter(this.listFilter);
        return data;
      })
    ;
  }

  save(id, item) {
    /* stub code and name */
    if(id === null){
      let num = Math.floor(Math.random() * 10000);
      item.code = 'P' + num;
    }
    if(typeof item.personData.firstname !== 'undefined'){
      item.dtype = 'individual';
    } else{
      item.dtype = 'corporate';
    }

    return super.save(id, item);
  }
}
