export class ContactPhone{
  id: string;
  phone: string;
  default: boolean;

  toString(): string {
    return `${this.phone}`.trim();
  }

  static convert(obj: any): ContactPhone {
    if(obj && !(obj instanceof ContactPhone)) {
      Object.setPrototypeOf(obj, ContactPhone.prototype);
    }

    return obj;
  }
}
