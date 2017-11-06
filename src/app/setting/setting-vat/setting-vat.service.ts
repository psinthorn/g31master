import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';

// RxJS operator
import 'rxjs/add/operator/map';

import { SettingService } from '../setting.service';

import {
  ServerResolverService,
  ConvertableModelType,
} from '@consol/shared';

import { Setting, SettingVat } from '../model';

@Injectable()
export class SettingVatService extends SettingService<SettingVat> {
  protected static get modelType() { return SettingVat as ConvertableModelType<SettingVat>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }
}
