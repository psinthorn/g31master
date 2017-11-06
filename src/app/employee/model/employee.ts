import { Account } from '@consol/account';
import { PersonIndividual } from '@consol/person';

export class Employee extends Account {
  individual: PersonIndividual;

  static convert(obj: any): Employee {
    if(obj && !(obj instanceof Employee)){
      Object.setPrototypeOf(obj, Employee.prototype);
      PersonIndividual.convert(obj.individual);
    }

    return obj;
  }
}
