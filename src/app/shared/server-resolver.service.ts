import { Injectable, Optional } from '@angular/core';

import { RestServerConfig } from './config';

@Injectable()
export class ServerResolverService{
  private _config: RestServerConfig;

  constructor(@Optional() config: RestServerConfig){
    if(config){
      this._config = config;
    } else{
      this._config = {
        default: {
          host: '//localhost',
          path: '/api/'
        },
        specifics: {}
      };
    }
  }

  getUrl(...params: string[]): string{
    let server = (params[1])? params[0] : null;
    let serviceName = params[1] || params[0];

    let serverConfig = this._config.default;
    if(this._config.specifics && (server in this._config.specifics)) serverConfig = this._config.specifics[server];

    return `${ serverConfig.host }${ (!serverConfig.port)? '' : ':' + serverConfig.port }${ serverConfig.path }${ serviceName }`;
  }
}
