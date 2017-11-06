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
import 'rxjs/add/operator/switchMap';

import 'i3e/observable/add/operator/extractAdditional';

import {
  AdditionalObservable,
  DataService,
  DataContext,
} from '@i3e';

import {
  ServerResolverService,
} from '@consol/shared';

import { ConvertableModelType } from './model';

function extractAdditional<T>(dataContext: DataContext<T>) {
  return [dataContext.data, { 'context': dataContext }];
}

function isObservable<T>(obj: any): obj is Observable<T> {
  return !!obj && (typeof obj.subscribe === 'function');
}

export abstract class DataStubNewService<T>
  implements DataService<T, T, T[], any, any> {
  protected static get serviceName() { return 'person'; }
  protected static get modelType(): ConvertableModelType<any> { return null; }

  constructor(
    protected http: Http,
    protected sr: ServerResolverService,
  ) { }

  protected hookGet(dataContext: DataContext<T>): Observable<DataContext<T>> {
    return Observable.of(dataContext);
  }

  protected extractGetFunction() {
    return extractAdditional as any;
  }

  get(id: number|Observable<number>): Observable<T> {
    return (() => {
      if(!id) return Observable.of({
        data: new (<typeof DataStubNewService>this.constructor).modelType() as T,
      });

      const fn = (id: number) => {
        let url = this.sr.getUrl(`${ (<typeof DataStubNewService>this.constructor).serviceName }/${ id }`);
        return this.http.get(url).map((response) => response.json());
      };

      return (isObservable(id))? id.switchMap(id => fn(id)) : fn(id);
    })()
      .map((dataContext) => {
        (<typeof DataStubNewService>this.constructor).modelType.convert(dataContext.data) as T;
        dataContext.actions = ['edit', 'delete'];
        return dataContext;
      })
      .switchMap((dataContext) => {
        return this.hookGet(dataContext);
      })
      .extractAdditional(this.extractGetFunction())
    ;
  }

  protected hookGetAll(dataContext: DataContext<T[]>): Observable<DataContext<T[]>> {
    return Observable.of(dataContext);
  }

  protected extractGetAllFunction<T>() {
    return extractAdditional as any;
  }

  getAll(itemQuery?: {[prop: string]: any}|Observable<{[prop: string]: any}>): Observable<T[]> {
    itemQuery = itemQuery || {};

    const fn = (itemQuery: {[prop: string]: any}) => {
      let url = this.sr.getUrl((<typeof DataStubNewService>this.constructor).serviceName);
      let params = new URLSearchParams();
      if(typeof itemQuery.term !== 'undefined'){
        params.set('code', itemQuery.term);
      }

      return this.http.get(url, { search: params });
    }

    return ((isObservable(itemQuery))? itemQuery.switchMap((itemQuery) => fn(itemQuery)) : fn(itemQuery))
      .map((response: Response) => {
        itemQuery = itemQuery as {[prop: string]: any};
        let dataContext = response.json() as DataContext<T[]>;
        dataContext.data = dataContext.data || [];
        dataContext.data.forEach((data) => {
          (<typeof DataStubNewService>this.constructor).modelType.convert(data) as T;
        });

        let page: number = itemQuery.page || 1;
        const itemPerPage: number = 25;
        let total: number = dataContext.data.length;
        dataContext.data = dataContext.data.slice(itemPerPage * (page - 1), itemPerPage * page);

        return Object.assign(dataContext, {
          pgData: {
            page: page,
            itemPerPage: itemPerPage,
            total: total,
          },
          actions: ['add'],
          searchable: true,
        });
      })
      .switchMap((dataContext) => {
        return this.hookGetAll(dataContext);
      })
      .extractAdditional(this.extractGetAllFunction())
    ;
  }

  save(id: number, item: T): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let url = (<typeof DataStubNewService>this.constructor).serviceName;
    let method = 'post';
    if(id !== null){
      url = `${ (<typeof DataStubNewService>this.constructor).serviceName }/${ id }`;
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
    let url = `${ (<typeof DataStubNewService>this.constructor).serviceName }/${ id }`;

    return this.http.delete(this.sr.getUrl(url))
      .map((response) => {
        let body = response.json() || {};
        let data = body.data || {};
        return data;
      })
    ;
  }
}
