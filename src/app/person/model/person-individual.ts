import { Person } from './person';

import {
  Citizen, Contact
} from '@consol/custom';

export class PersonIndividual extends Person {
  personData: Citizen;
  phone: string;
  fax: string;

  static convert(obj: any): PersonIndividual {
    if(obj && !(obj instanceof PersonIndividual)){
      Object.setPrototypeOf(Person.convert(obj), PersonIndividual.prototype);
      Citizen.convert(obj.personData);
    }

    return obj;
  }
}
