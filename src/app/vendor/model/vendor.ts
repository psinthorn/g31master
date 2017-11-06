import { Account } from '@consol/account';

import { Person } from '@consol/person';

export class Vendor extends Account {
  owner: Person;

  static convert(obj: any): Vendor {
    if(obj && !(obj instanceof Vendor)){
      Object.setPrototypeOf(Account.convert(obj), Vendor.prototype);
      Person.convert(obj.owner);
    }

    return obj;
  }
}
