import { Observable } from 'rxjs/Observable';
import { extractAdditional } from '../../operator/extractAdditional';

Observable.prototype.extractAdditional = extractAdditional;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    extractAdditional: typeof extractAdditional;
  }
}
