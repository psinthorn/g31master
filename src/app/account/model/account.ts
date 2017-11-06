import { ExtendableProperty } from '@consol/custom';

export class Account implements ExtendableProperty {
  id: string;
  code: string;
  name: string;
  dtype: string;
  remark: string;

  toString(): string {
    return `${this.code} ${this.name}`;
  }

  static convert(obj: any): Account {
    if(obj && !(obj instanceof Account)) {
      Object.setPrototypeOf(obj, Account.prototype);
    }

    return obj;
  }
}
