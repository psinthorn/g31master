import { Address } from '@consol/custom';

export class HomeDetail{
  att1: string;
  att2: string;

  static convert(obj: any): HomeDetail {
    return obj;
  }
}

export class Home{
  id: number;
  code: string;
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  postalcode: string;
  details: HomeDetail[];

  addressEx: Address;

  parent: Home;

  toString(): string {
    return `${this.code} ${this.firstname} ${this.lastname}`;
  }

  static convert(obj: any): Home {
    if(obj && !(obj instanceof Home)){
      Object.setPrototypeOf(obj, Home.prototype);
      (obj.details || []).forEach((data) => HomeDetail.convert(data));
      Address.convert(obj.address);
      Home.convert(obj.parent);
    }
    return obj;
  }
}
