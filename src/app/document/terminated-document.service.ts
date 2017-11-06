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
  DocumentStubNewService,
} from './document-stub.new-service';

@Injectable()
export class TerminatedDocumentService<ET> extends DocumentStubNewService<Document, ET> {
  protected static get serviceName() { return 'document'; }
  protected static get modelType() { return Document as ConvertableModelType<Document>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }
}
