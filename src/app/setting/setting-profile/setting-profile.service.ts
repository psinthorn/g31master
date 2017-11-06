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

import { Setting, SettingProfile } from '../model';

@Injectable()
export class SettingProfileService extends SettingService<SettingProfile> {
  protected static get modelType() { return SettingProfile as ConvertableModelType<SettingProfile>; }

  constructor(
    http: Http,
    sr: ServerResolverService,
  ) {
    super(http, sr);
  }
}
