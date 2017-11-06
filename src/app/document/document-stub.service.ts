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

import { Document, TerminatedDocument } from './model';
import { SystemUser } from '@consol/system';

import { ServerResolverService, ConvertableModelType } from '@consol/shared';

import { DataStubService } from '@consol/shared/data-stub.service';
import { DocumentDataService, TerminatedDocumentDataService } from './document.base-service';

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
    updateOf: item.updateOf,
    updateTos: item.updateTos,
  };
}

export abstract class DocumentStubService<T extends Document, ET>
  extends DataStubService<T>
  implements DocumentDataService<T, ET> {
  protected static get entityName() { return 'document'; }
  protected static get modelType() { return Document as ConvertableModelType<Document>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }

  get(id) {
    return super.get(id)
      .map((metaData) => {
        metaData.actions = ['replace', 'cancel', 'reject'];

        return metaData;
      })
    ;
  }

  terminate(id: number, terminatedData: TerminatedDocument): Observable<any> {
    return this.get(id).switchMap((metaData) => {
      let item = metaData.data;

      terminatedData.origin = cloneDocument(item);

      item.terminated = terminatedData;

      let deepUpdateFn = (doc: Document) => {
        if((terminatedData.type === 'REJECT') && doc.updateOf) {
          let id = +doc.updateOf;
          return this.get(id).switchMap((metaDoc) => {
            let item = metaDoc.data;
            item.terminated = terminatedData;

            return this.save(id, item).switchMap(deepUpdateFn);
          });
        } else return Observable.of(doc);
      };

      return this.save(id, item).switchMap(deepUpdateFn);
    });
  }

  replace(id: number, data: T): Observable<any> {
    return this.get(id).switchMap((metaData) => {
      let item = metaData.data;
      data.updateOf = cloneDocument(item);

      return this.save(null, data).switchMap((data) => {
        item.updateTos = item.updateTos || [];
        item.updateTos.push(cloneDocument(data));
        return this.save(id, item).map(() => data);
      });
    });
  }
}
