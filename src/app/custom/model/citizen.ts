import { PersonData } from './person-data';

import { Address } from './address';

export class Citizen extends PersonData {
  initname: string;
  firstname: string;
  lastname: string;
  birthDate: Date;
  religious: string;

  issueDate: Date;
  expiredDate: Date;

  static convert(obj: any): Citizen {
    if(obj && !(obj instanceof Citizen)) {
      Object.setPrototypeOf(PersonData.convert(obj), Citizen.prototype);
    }

    return obj;
  }
}
