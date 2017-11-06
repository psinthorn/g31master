import { ContactPhone } from './contact-phone';

export class Contact{
  id: string;
  alias: string;
  position: string;
  email: string;
  lineId: string;
  phones: ContactPhone[];

  get phone(): string {
    let phone = null;
    if(this.phones && (typeof this.phones[0] !== 'undefined')) phone = this.phones[0];
    (this.phones || []).forEach((data) => {
      if(data.default) phone = data;
    });

    return phone && phone.toString();
  }

  toString(): string {
    return `${this.alias} ${this.phone}`;
  }

  static convert(obj: any): Contact {
    if(obj && !(obj instanceof Contact)) {
      Object.setPrototypeOf(obj, Contact.prototype);
      (obj.phones || []).forEach((data) => ContactPhone.convert(data));
    }

    return obj;
  }
}
