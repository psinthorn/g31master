import { Injectable } from '@angular/core';
import {
  Http,
  Response, Headers, RequestOptions, RequestOptionsArgs,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/map';

import { DataContext } from '@i3e';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { Project } from './model';

import { ProjectService } from './project.service';

// Stub Data
import { DataStubNewService } from '@consol/shared/data-stub.new-service';

@Injectable()
export class ProjectStubService extends DataStubNewService<Project>
implements ProjectService {
  protected static get serviceName() { return 'project'; }
  protected static get modelType() { return Project as ConvertableModelType<Project>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  protected hookGet(dataContext: DataContext<Project>): Observable<DataContext<Project>> {
    dataContext.links = dataContext.links || [];
    dataContext.links.push('boq');

    return Observable.of(dataContext);
  }

  save(id: number, item: Project): Observable<any> {
    /* stub code and name */
    if(id === null){
      let num = Math.floor(Math.random() * 10000);
      item.code = 'PJ' + num;
    }

    return super.save(id, item);
  }
}
