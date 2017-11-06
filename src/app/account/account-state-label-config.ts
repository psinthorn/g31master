import { StateLabelConfig } from '@i3e/global-state';

import { Account } from './model';

export class AccountStateLabelConfig<T extends Account> implements StateLabelConfig {
  constructor(private entityName: string) { }

  readonly for = {
    list: (data: T[]): string => {
      return this.entityName;
    },

    view: (data: T): string => {
      if(data.id) return data.code;
      return `View - ${ this.entityName }`;
    },

    form: (data: T): string => {
      if(data.id) return `Edit - ${ data.code }`;
      return `Add - ${ this.entityName }`;
    },
  };
}
