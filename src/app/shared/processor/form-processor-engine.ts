import { Observable } from 'rxjs/observable';

import { DataSave } from '@i3e/data-service';

export abstract class FormProcessorEngine<T, ES> {
  readonly save: (data: T) => Observable<ES> ;
  readonly cancel: () => void;
}
