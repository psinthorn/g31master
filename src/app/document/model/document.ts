import { ExtendableProperty } from '@consol/custom';

import { Account } from '@consol/account';

import { SystemUser } from '@consol/system';

export class Document extends Account {
  creator: SystemUser;             // Passive entry
  timestamp: Date;                 // Passive entry
  approved: boolean;               // Passive entry
  terminated: TerminatedDocument;  // Passive enry
  updateOf: Document;              // Passive entry
  updateTos: Document[];           // Transient

  static convert(obj: any): Document {
    if(obj && !(obj instanceof Document)){
      Object.setPrototypeOf(Account.convert(obj), Document.prototype);
      SystemUser.convert(obj.creator);
      TerminatedDocument.convert(obj.terminated);
      Document.convert(obj.updateOf);
      (obj.updateTos || []).forEach((data) => Document.convert(data));
    }

    return obj;
  }
}

export class TerminatedDocument {
  id: string;
  type: string;         // automatic entry
  creator: SystemUser;  // Passive entry
  timestamp: Date;      // Passive entry
  origin: Document;     // Passive entry
  description: string;

  static convert(obj: any): TerminatedDocument {
    if(obj && !(obj instanceof TerminatedDocument)) {
      Object.setPrototypeOf(obj, TerminatedDocument.prototype);
      SystemUser.convert(obj.creator);
      Document.convert(obj.origin);
    }

    return obj;
  }
}
