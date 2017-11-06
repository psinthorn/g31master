import {
  Http,
  Response, Headers, RequestOptions,
  URLSearchParams
} from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS static methods
import 'rxjs/add/observable/of';

// RxJS add operators
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import { DataContext } from '@i3e';

import { Document, TerminatedDocument } from './model';
import { SystemUser } from '@consol/system';

import { ServerResolverService, ConvertableModelType } from '@consol/shared';

import { DocumentDataNewService, TerminatedDocumentDataService } from './document.base-service';

import { DataStubNewService } from '@consol/shared/data-stub.new-service';

const systemuserStub: SystemUser = {
  id: '1',
  code: 'SYSTEM',
  name: 'SYSTEM',
  dtype: 'canceledDocument',
  plainPassword: null,
  individualRoles: [],
  groups: [],
  remark: null,
};

function cloneDocument<T extends Document>(item: T): Document {
  return {
    id: item.id,
    dtype: item.dtype,
    code: item.code,
    name: item.name,
    remark: item.remark,
    creator: item.creator,
    timestamp: item.timestamp,
    approved: item.approved,
    terminated: item.terminated,
    // TODO: try set to real
    updateOf: item.updateOf,
    updateTos: item.updateTos,
  };
}

export abstract class DocumentStubNewService<T extends Document, ET>
extends DataStubNewService<T>
implements DocumentDataNewService<T, ET> {
  protected static get entityName() { return 'document'; }
  protected static get modelType() { return Document as ConvertableModelType<Document>; }
  protected static get prefix() { return 'DOC'; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  protected hookGet(dataContext: DataContext<T>): Observable<DataContext<T>> {
    const document = dataContext.data;
    let updateable = true;
    if(document.terminated) {
      updateable = false;
    } else {
      if(!document.updateTos) document.updateTos = [];
      for(let updataTo of document.updateTos) {
        if(!updataTo.terminated) {
          updateable = false;
          break;
        }
      }
    }

    dataContext.actions = (updateable)?
      ['replace', 'cancel', 'reject']
    :
      []
    ;

    return Observable.of(dataContext);
  }

  terminate(id: number, terminatedData: TerminatedDocument): Observable<ET> {
    return this.get(id).switchMap((item) => {
      terminatedData.origin = cloneDocument(item);

      item.terminated = terminatedData;

      let deepUpdateFn = (doc: Document) => {
        if((terminatedData.type === 'REJECT') && doc.updateOf) {
          let id = +doc.updateOf;
          return this.get(id).switchMap((item) => {
            item.terminated = terminatedData;

            return this.save(id, item).switchMap(deepUpdateFn);
          });
        } else return Observable.of(doc);
      };

      return this.save(id, item).switchMap(deepUpdateFn);
    });
  }

  replace(id: number, data: T): Observable<any> {
    return this.get(id).switchMap((item) => {
      if(item.id) data.updateOf = cloneDocument(item);

      let num = Math.floor(Math.random() * 10000);
      data.code = `${ (<typeof DocumentStubNewService>this.constructor).prefix }/${ num }`;
      data.id = null;

      return this.save(null, data).switchMap((data) => {
        item.updateTos = item.updateTos || [];
        item.updateTos.push(cloneDocument(data));
        return this.save(id, item).map((oldData) => data);
      });
    });
  }
}
