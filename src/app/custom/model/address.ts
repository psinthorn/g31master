export class Address {
  id: string;
  address: string;
  subdistrict: string;
  district: string;
  province: string;
  postalcode: string;

  toString(): string {
    return `${this.address}
ต.${this.subdistrict} อ.${this.district} จ.${this.province} ${this.postalcode}`.trim();
  }

  static convert(obj: any): Address {
    if(obj && !(obj instanceof Address)) {
      Object.setPrototypeOf(obj, Address.prototype);
    }

    return obj;
  }
}
