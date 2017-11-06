export class BankAccount {
  id: string;
  code: string;
  name: string;
  category: string;
  bank: string;
  branch: string;

  toString(): string {
    return `${this.code} ${this.name} ${this.category}
${this.bank} ${this.branch}`.trim();
  }

  static convert(obj: any): BankAccount {
    if(obj && !(obj instanceof BankAccount)) {
      Object.setPrototypeOf(obj, BankAccount.prototype);
    }

    return obj;
  }
}
