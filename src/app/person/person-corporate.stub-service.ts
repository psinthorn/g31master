import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServerResolverService, ConvertableModelType } from '@consol/shared';

import { PersonCorporate } from './model';

import { PersonCorporateService } from './person-corporate.service';

// stub service
import { PersonBaseService } from './person.base-service';

@Injectable()
export class PersonCorporateStubService
extends PersonBaseService<PersonCorporate>
implements PersonCorporateService {
  protected static get serviceName() { return 'person'; }
  protected static get modelType() { return PersonCorporate as ConvertableModelType<PersonCorporate>; }

  protected listFilter(data: PersonCorporate) { return data.dtype === 'corporate'; }

  constructor(
    http: Http,
    sr: ServerResolverService
  ) {
    super(http, sr);
  }
}
