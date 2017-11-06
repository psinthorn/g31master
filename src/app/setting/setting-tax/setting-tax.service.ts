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

import { Setting, SettingTax } from '../model';

@Injectable()
export class SettingTaxService extends SettingService<SettingTax> {
  protected static get modelType() { return SettingTax as ConvertableModelType<SettingTax>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }
}
