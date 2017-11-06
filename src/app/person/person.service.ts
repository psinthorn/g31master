import { DataService } from '@i3e/data-service';

import { Person } from './model';

export abstract class PersonService
extends DataService<Person, Person, Person[], any, any> { }
