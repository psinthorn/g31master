import { DataService } from '@i3e/data-service';

import { PersonCorporate } from './model';

export abstract class PersonCorporateService
extends DataService<PersonCorporate, PersonCorporate, PersonCorporate[], any, any> { }
