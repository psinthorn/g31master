import { Account } from '@consol/account';

export class SystemAccount extends Account {
  individualRoles: string[];
  groups: SystemGroup[];

  static convert(obj: any): SystemAccount {
    if(obj && !(obj instanceof SystemAccount)) {
      Object.setPrototypeOf(Account.convert(obj), SystemAccount.prototype);
      (obj.groups || []).forEach((data) => SystemGroup.convert(data));
    }

    return obj;
  }
}

export class SystemUser extends SystemAccount {
  plainPassword: string;

  static convert(obj: any): SystemUser {
    if(obj && !(obj instanceof SystemUser)) {
      Object.setPrototypeOf(SystemAccount.convert(obj), SystemUser.prototype);
    }

    return obj;
  }
}

export class SystemGroup extends SystemAccount {
  accounts: SystemAccount[];

  static convert(obj: any): SystemGroup {
    if(obj && !(obj instanceof SystemGroup)) {
      Object.setPrototypeOf(SystemAccount.convert(obj), SystemGroup.prototype);
      (obj.accounts || []).forEach((data) => SystemAccount.convert(data));
    }

    return obj;
  }
}

export class SystemClient extends SystemAccount {
  secret: string;
  redirectUris: string[];
  allowedGrantTypes: string[];

  static convert(obj: any): SystemClient {
    if(obj && !(obj instanceof SystemClient)) {
      Object.setPrototypeOf(SystemAccount.convert(obj), SystemClient.prototype);
    }

    return obj;
  }
}
