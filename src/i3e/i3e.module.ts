import { NgModule, ModuleWithProviders } from '@angular/core';

import {
  JsonPipe,
} from './pipe';

import {
  ObservableCacheDirective,
  ObservableCacheStorageDirective,
} from './observable-cache'

import {
  DataLoaderDirective,
  ExistingLoaderDirective,
  FunctioningLoaderDirective,
  ListRoutingLoaderDirective, ItemRoutingLoaderDirective,
  DataPreloadingLoaderDirective,
} from './data-loader';

import {
  ProcessorDirective,
  ParentProcessorDirective,
} from './processor';

import { GlobalStateService } from './global-state';

@NgModule({
  exports: [
    JsonPipe,

    ObservableCacheDirective,
    ObservableCacheStorageDirective,

    DataLoaderDirective,
    ExistingLoaderDirective,
    FunctioningLoaderDirective,
    ListRoutingLoaderDirective, ItemRoutingLoaderDirective,
    DataPreloadingLoaderDirective,

    ProcessorDirective,
    ParentProcessorDirective,
  ],
  declarations: [
    JsonPipe,

    ObservableCacheDirective,
    ObservableCacheStorageDirective,

    DataLoaderDirective,
    ExistingLoaderDirective,
    FunctioningLoaderDirective,
    ListRoutingLoaderDirective, ItemRoutingLoaderDirective,
    DataPreloadingLoaderDirective,

    ProcessorDirective,
    ParentProcessorDirective,
  ],
})
export class I3eModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: I3eModule,
      providers: [
        GlobalStateService,
      ]
    };
  }
}
