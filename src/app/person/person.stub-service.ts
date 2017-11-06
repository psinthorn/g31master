import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServerResolverService, ConvertableModelType } from '@consol/shared';

import { Person } from './model';

import { PersonService } from './person.service';

// stub service
import { PersonBaseService } from './person.base-service';

@Injectable()
export class PersonStubService
extends PersonBaseService<Person>
implements PersonService {
  protected static get serviceName() { return 'person'; }
  protected static get modelType() { return Person as ConvertableModelType<Person>; }

  protected listFilter(data: Person) { return true; }

  constructor(
    http: Http,
    sr: ServerResolverService
  ) {
    super(http, sr);
  }
}
