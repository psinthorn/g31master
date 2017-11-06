import {
  NgModule, ModuleWithProviders,
  Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RestServerConfig } from '../shared/config';

import { ServerResolverService } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [ ServerResolverService ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule){
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot(options: {[configType: string]: any}): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: RestServerConfig, useValue: options['REST_SERVER_CONFIG'] }
      ]
    };
  }
}
