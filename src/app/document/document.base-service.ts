import { Observable } from 'rxjs/Observable';

import { DataService as OldDataService } from '@consol/shared';
import { DataService } from '@i3e/data-service';

import { Document, TerminatedDocument } from './model';

export abstract class DocumentTerminate<ET> {
  abstract terminate(id: number, terminatedData: TerminatedDocument): Observable<ET>;

  static isValid<ET>(obj: any): obj is DocumentTerminate<ET> {
    return typeof obj.cancel === 'function';
  }
}

export abstract class DocumentReplace<T extends Document> {
  abstract replace(id: number, data: T): Observable<any>;

  static isValid<T extends Document>(obj: any): obj is DocumentReplace<T> {
    return typeof obj.replace === 'function';
  }
}

export abstract class TerminatedDocumentDataService
extends OldDataService<TerminatedDocument> { }

export abstract class DocumentDataService<T extends Document, ET>
extends OldDataService<T>
  implements DocumentTerminate<ET>, DocumentReplace<T> {
  abstract terminate(id: number, terminatedData: TerminatedDocument): Observable<ET>;
  abstract replace(id: number, data: T): Observable<any>;
}

export abstract class DocumentDataNewService<T extends Document, ET>
extends DataService<T, T, T[], any, any>
implements DocumentTerminate<ET>, DocumentReplace<T> {
  abstract terminate(id: number, terminatedData: TerminatedDocument): Observable<ET>;
  abstract replace(id: number, data: T): Observable<any>;
}
