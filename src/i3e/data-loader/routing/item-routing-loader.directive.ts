import {
  Directive, forwardRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/map';

import { DataGet } from '../../data-service';

import { dataLoaderDirectiveName } from '../predefine';

import { DataLoaderEngine } from '../data-loader-engine';

import { DataRoutingLoader } from './data-routing-loader';

export const i3eItemRoutingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => ItemRoutingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="itemRouting"]`,
  providers: [ i3eItemRoutingLoaderEngine ],
})
export class ItemRoutingLoaderDirective<T> extends DataRoutingLoader<number, T, DataGet<T>> {
  constructor(
    activatedRoute: ActivatedRoute,
  ) {
    super(activatedRoute);
  }

  observable(): Observable<number> {
    return this.activatedRoute.params.map((params) => +[params['id']] || null);
  }

  load(id: number): Observable<T> {
    return this.dataService.get(id);
  }
}
