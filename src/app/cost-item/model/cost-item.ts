import { Account } from '@consol/account';

export class CostItem extends Account{
  type: string;
  unit: string;
  price: number;
  description: string;

  toString(): string {
    return `${super.toString()}/${this.unit}`;
  }

  static convert(obj: any): CostItem {
    if(obj && !(obj instanceof CostItem)){
      Object.setPrototypeOf(Account.convert(obj), CostItem.prototype);
    }

    return obj;
  }
}
