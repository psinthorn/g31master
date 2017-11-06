import { DataService } from '@i3e/data-service';

import { PersonIndividual } from './model';

export abstract class PersonIndividualService
extends DataService<PersonIndividual, PersonIndividual, PersonIndividual[], any, any> { }
