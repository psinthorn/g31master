import {
  Directive, forwardRef, SkipSelf,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

// RxJS static method
import 'rxjs/add/observable/of';

import { DataGet } from '../../data-service';

import { dataLoaderDirectiveName } from '../predefine';

import { DataLoaderEngine } from '../data-loader-engine';
import { DataLoader } from '../data-loader';

export const i3eDataPreloadingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => DataPreloadingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="dataPreloading"]`,
  providers: [ i3eDataPreloadingLoaderEngine ],
})
export class DataPreloadingLoaderDirective<T>
implements DataLoaderEngine<Observable<T>, T> {
  constructor(
    @SkipSelf() private preloader: DataLoader<T>,
  ) { }

  observable(): Observable<Observable<T>> {
    return Observable.of(this.preloader.data$);
  }

  load(observable: Observable<T>): Observable<T> {
    return observable;
  }
}
