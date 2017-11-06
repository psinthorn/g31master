import {
  Directive, forwardRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { DataGetAll } from '../../data-service';

import { dataLoaderDirectiveName } from '../predefine';

import { DataLoaderEngine } from '../data-loader-engine';

import { DataRoutingLoader } from './data-routing-loader';

export const i3eListRoutingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => ListRoutingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="listRouting"]`,
  providers: [ i3eListRoutingLoaderEngine ],
})
export class ListRoutingLoaderDirective<T, E extends DataGetAll<T>> extends DataRoutingLoader<{[key: string]: any}, T, E> {
  constructor(
    activatedRoute: ActivatedRoute,
  ) {
    super(activatedRoute);
  }

  observable(): Observable<{[key: string]: any}> {
    return this.activatedRoute.queryParams;
  }

  load(params: {[key: string]: any}): Observable<T> {
    return this.dataService.getAll(params);
  }
}
