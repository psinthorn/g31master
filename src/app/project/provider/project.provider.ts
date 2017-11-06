import { InjectionToken, forwardRef } from '@angular/core';

import { DataLoader } from '@i3e/data-loader';

import { Project } from '../model';

export const csProjectItemLoader = new InjectionToken<DataLoader<Project>>('CsProjectItemLoader');

export const csProjectItemLoaderProvider: any = {
  provide: csProjectItemLoader,
  useExisting: forwardRef(() => DataLoader),
};
