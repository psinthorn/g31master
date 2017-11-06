import { ExtendableProperty } from './extendable-property';

import { Address } from './address';

export class PersonData implements ExtendableProperty {
  id: string;
  code: string;
  name: string;
  dtype: string;
  address: Address;

  toString(): string {
    return `${this.code} ${this.name}`.trim();
  }

  static convert(obj: any): PersonData {
    if(obj && !(obj instanceof PersonData)){
      Object.setPrototypeOf(obj, PersonData.prototype);
      Address.convert(obj.address);
    }

    return obj;
  }
}
