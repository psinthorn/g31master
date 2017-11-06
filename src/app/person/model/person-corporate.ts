import { Person } from './person';

import {
  Corporate, Contact
} from '@consol/custom';

export class PersonCorporate extends Person {
  personData: Corporate;
  phone: string;
  fax: string;
  contacts: Contact[];

  get contact() {
    let contact = null;
    if(this.contacts && (typeof this.contacts[0] !== 'undefined')) contact = this.contacts[0];

    return contact;
  }

  static convert(obj: any): PersonCorporate {
    if(obj && !(obj instanceof PersonCorporate)){
      Object.setPrototypeOf(Person.convert(obj), PersonCorporate.prototype);
      Corporate.convert(obj.personData);
      (obj.contacts || []).forEach((data) => Contact.convert(data));
    }

    return obj;
  }
}
