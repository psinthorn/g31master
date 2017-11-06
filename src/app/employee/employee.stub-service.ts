import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions, RequestOptionsArgs,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

import {
  ServerResolverService,
  DataService, ConvertableModelType,
} from '@consol/shared';

import { Employee } from './model';

import { EmployeeService } from './employee.service';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export class EmployeeStubService
extends DataStubNewService<Employee>
implements EmployeeService {
  protected static get serviceName() { return 'employee'; }
  protected static get modelType() { return Employee as ConvertableModelType<Employee>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  save(id, item) {
    /* stub code and name */
    if(id === null){
      let num = Math.floor(Math.random() * 10000);
      item.code = 'E' + num;
    }
    item.name = item.individual.name;

    return super.save(id, item);
  }
}
