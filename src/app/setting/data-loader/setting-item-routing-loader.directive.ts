import {
  Directive, forwardRef, Input, OnInit,
} from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/map';

import {
  dataLoaderDirectiveName,
  DataLoaderEngine,
} from '@i3e/data-loader';

import { Setting } from '../model';

import { SettingService } from '../setting.service';

export const i3eSettingItemRoutingLoaderEngine: any = {
  provide: DataLoaderEngine,
  useExisting: forwardRef(() => SettingItemRoutingLoaderDirective),
};

@Directive({
  selector: `[${ dataLoaderDirectiveName }="csSettingItemRouting"]`,
  providers: [ i3eSettingItemRoutingLoaderEngine ],
})
export class SettingItemRoutingLoaderDirective<T extends Setting, S extends SettingService<T>>
implements DataLoaderEngine<string, T>, OnInit {
  @Input('dataService') private dataService: S;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    if(!this.dataService) throw new Error(`${ this.constructor.name } requires dataService property`);
  }

  observable(): Observable<string> {
    return this.activatedRoute.url.map((paths) => paths[paths.length - 1].path);
  }

  load(path: string): Observable<T> {
    return this.dataService.getByCode(path);
  }
}
