import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ServerResolverService, ConvertableModelType } from '@consol/shared';

import { PersonIndividual } from './model';

import { PersonIndividualService } from './person-individual.service';

// stub service
import { PersonBaseService } from './person.base-service';

@Injectable()
export class PersonIndividualStubService
extends PersonBaseService<PersonIndividual>
implements PersonIndividualService {
  protected static get serviceName() { return 'person'; }
  protected static get modelType() { return PersonIndividual as ConvertableModelType<PersonIndividual>; }

  protected listFilter(data: PersonIndividual) { return data.dtype === 'individual'; }

  constructor(
    http: Http,
    sr: ServerResolverService
  ) {
    super(http, sr);
  }
}
