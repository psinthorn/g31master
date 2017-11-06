import { Injectable } from '@angular/core';
import {
  Http,
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/map';

import 'i3e/observable/add/operator/extractAdditional';

import { DataContext } from '@i3e';
import { capitalize } from '@i3e/function';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { Setting } from './model';

// Stub Data
import {
  DataStubNewService,
} from '@consol/shared/data-stub.new-service';

@Injectable()
export class SettingService<T extends Setting> extends DataStubNewService<T> {
  protected static get serviceName() { return 'setting'; }
  protected static get modelType() { return Setting as ConvertableModelType<Setting>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  protected extractGetAllFunction() {
    return (dataContext) => {
      dataContext.searchable = false;
      dataContext.pgData = null;
      dataContext.actions = [];
      return [dataContext.data, { context: dataContext}];
    };
  }

  protected extractGetFunction() {
    return (dataContext) => {
      dataContext.actions = ['edit'];
      return [dataContext.data, { context: dataContext}];
    };
  }

  getByCode(code: string): Observable<T> {
    let url = this.sr.getUrl(`${ (<typeof DataStubNewService>this.constructor).serviceName }?code=^${code}$`);

    return this.http.get(url)
      .map((response) => {
        let dataContext = response.json() as DataContext<any>;
        dataContext.data = (dataContext.data)? dataContext.data[0] : null;
        (<typeof DataStubNewService>this.constructor).modelType.convert(dataContext.data) as Setting;
        dataContext.actions = ['edit'];

        return dataContext;
      })
      .extractAdditional(this.extractGetFunction() as any)
    ;
  }

  protected getDtype(code: string) {
    return 'setting' + capitalize(code.toLowerCase());
  }

  save(id: number, item: any): Observable<any> {
    item.dtype = this.getDtype(item.code);
    return super.save(id, item);
  }
}
