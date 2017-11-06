import { Account } from '@consol/account';
import { Person } from '@consol/person';

import {
  Address, Contact, BankAccount
} from '@consol/custom'

import { Employee } from '@consol/employee';

export class Project extends Account {
  owner: Person;
  address: Address;
  contacts: Contact[];
  bankAccounts: BankAccount[];
  workers: Employee[];

  static convert(obj: any): Project {
    if(obj && !(obj instanceof Project)){
      Object.setPrototypeOf(Account.convert(obj), Project.prototype);
      Person.convert(obj.owner);
      Address.convert(obj.address);
      (obj.contacts || []).forEach((data) => Contact.convert(data));
      (obj.bankAccounts || []).forEach((data) => BankAccount.convert(data));
      (obj.workers || []).forEach((data) => Employee.convert(data));
    }

    return obj;
  }
}
