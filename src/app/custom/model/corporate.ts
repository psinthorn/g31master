import { PersonData } from './person-data';

import { Address } from './address';

export class Corporate extends PersonData {
  registrationDate: Date;
  category: string;
  corporateName: string;
  main: boolean;
  branch: string;

  static convert(obj: any): Corporate {
    if(obj && !(obj instanceof Corporate)){
      Object.setPrototypeOf(PersonData.convert(obj), Corporate.prototype);
    }

    return obj;
  }
}
