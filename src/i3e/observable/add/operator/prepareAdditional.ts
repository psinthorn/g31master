import { Observable } from 'rxjs/Observable';
import { prepareAdditional } from '../../operator/prepareAdditional';

Observable.prototype.prepareAdditional = prepareAdditional;

declare module 'rxjs/Observable' {
  interface Observable<T> {
    prepareAdditional: typeof prepareAdditional;
  }
}
