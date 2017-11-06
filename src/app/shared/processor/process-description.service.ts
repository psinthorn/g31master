import { Injectable, Inject } from '@angular/core';

import { capitalize } from '@i3e/function';

import { ProcessDescription, defaultProcessDescription } from './process-description.type';

@Injectable()
export class ProcessDescriptionService {
  private config = {
    add: { icon: 'add', color: 'primary' },
    edit: { icon: 'edit', color: 'primary' },
    delete: { icon: 'delete_forever', color: 'warn' },
    print: { icon: 'print', color: 'primay' },

    save: { icon: 'save', color: 'primary' },
  };

  constructor(
    //@Inject('CONFIG_PROCESS_DESCRIPTION') private config: {[name: string]: ProcessDescription},
  ) {

  }

  createDescription(name: string) {
    const description: ProcessDescription = Object.assign({name: name},
      defaultProcessDescription, this.config[name],
    );

    if(!description.label) description.label = capitalize(name);

    return description;
  }
}
