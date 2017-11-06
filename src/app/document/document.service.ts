import { Injectable } from '@angular/core';
import {
  Http,
} from '@angular/http';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { Document } from './model';

// Stub Data
import {
  DocumentStubService,
} from './document-stub.service';

@Injectable()
export class DocumentService extends DocumentStubService<Document, any> {
  protected static get serviceName() { return 'document'; }
  protected static get modelType() { return Document as ConvertableModelType<Document>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }
}
