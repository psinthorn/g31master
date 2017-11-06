import {
  ExtendableProperty,
  PersonData, Address, Contact, BankAccount,
} from '@consol/custom';

import { Account } from '@consol/account';

export class Person extends Account {
  personData: PersonData;
  address: Address;
  contact: Contact;
  bankAccounts: BankAccount[];

  static convert(obj: any): Person {
    if(obj && !(obj instanceof Person)){
      Object.setPrototypeOf(Account.convert(obj), Person.prototype);
      PersonData.convert(obj.personData);
      Address.convert(obj.address);
      Contact.convert(obj.contact);
      (obj.bankAccounts || []).forEach((data) => BankAccount.convert(data));
    }

    return obj;
  }
}
