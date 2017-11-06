import { Directive } from '@angular/core';

import { csProjectItemLoaderProvider } from '../provider';

@Directive({
  selector: '[csProjectItemLoader]',
  providers: [csProjectItemLoaderProvider],
})
export class ProjectItemLoaderDirective { }
