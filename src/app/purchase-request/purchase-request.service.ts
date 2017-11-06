import { Injectable } from '@angular/core';
import {
  Http,
} from '@angular/http';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { PurchaseRequest } from './model';

// Stub Data
import {
  DocumentStubNewService,
} from '@consol/document/document-stub.new-service';

@Injectable()
export class PurchaseRequestService extends DocumentStubNewService<PurchaseRequest, any> {
  protected static get serviceName() { return 'purchase_request'; }
  protected static get modelType() { return PurchaseRequest as ConvertableModelType<PurchaseRequest>; }
  protected static get prefix() { return 'PR'; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }
}
