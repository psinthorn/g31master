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
  DataService,

  MetaDataBase,
} from '@consol/shared';

import { ConvertableModelType } from './model';

export abstract class DataStubService<T> implements DataService<T> {
  protected static get serviceName() { return 'person'; }
  protected static get modelType(): ConvertableModelType<any> { return null; }

  constructor(
    protected http: Http,
    protected sr: ServerResolverService,
  ) { }

  getAll(itemQuery?: {[prop: string]: any}): Observable<MetaDataBase<Array<T>>> {
    itemQuery = itemQuery || {};
    let url = this.sr.getUrl((<typeof DataStubService>this.constructor).serviceName);
    let params = new URLSearchParams();
    if(typeof itemQuery.term !== 'undefined'){
      params.set('code', itemQuery.term);
    }

    return this.http.get(url, { search: params })
      .map((response: Response) => {
        let metaData = response.json();
        metaData.data = metaData.data || [];
        metaData.data
          .forEach((data) => {
            (<typeof DataStubService>this.constructor).modelType.convert(data) as T;
          })
        ;

        let page: number = itemQuery.page || 1;
        const itemPerPage: number = 25;
        let total: number = metaData.data.length;
        metaData.data = metaData.data.slice(itemPerPage * (page - 1), itemPerPage * page);

        Object.assign(metaData, {
          pgData: {
            page: page,
            itemPerPage: itemPerPage,
            total: total,
          },
          actions: ['add'],
          searchable: true,
        });

        return metaData;
      })
    ;
  }

  get(id: number): Observable<MetaDataBase<T>> {
    if(!id) return Observable.of({
      data: new (<typeof DataStubService>this.constructor).modelType() as T
    });

    let url = this.sr.getUrl(`${ (<typeof DataStubService>this.constructor).serviceName }/${ id }`);
    return this.http.get(url)
      .map((response) => {
        let metaData = response.json();
        (<typeof DataStubService>this.constructor).modelType.convert(metaData.data) as T;
        metaData.actions = ['edit', 'delete'];

        return metaData;
      })
    ;
  }

  save(id: number, item: T): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = (<typeof DataStubService>this.constructor).serviceName;
    let method = 'post';
    if(id !== null){
      url = `${ (<typeof DataStubService>this.constructor).serviceName }/${ id }`;
      method = 'put';
    }

    return this.http[method](this.sr.getUrl(url), item, options)
      .map((response) => {
console.debug('response:', response);
        let body = response.json() || {};
        let data = body.data || {};
        return data;
      })
    ;
  }

  delete(id: number): Observable<any> {
    if(id === null) throw new Error('Not Found');
    let url = `${ (<typeof DataStubService>this.constructor).serviceName }/${ id }`;

    return this.http.delete(this.sr.getUrl(url))
      .map((response) => {
        let body = response.json() || {};
        let data = body.data || {};
        return data;
      })
    ;
  }
}
