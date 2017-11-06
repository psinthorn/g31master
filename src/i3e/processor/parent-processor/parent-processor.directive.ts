import {
  Directive, forwardRef, SkipSelf, Inject,
} from '@angular/core';

import { Processor } from '../processor';

export const i3eParentProcessor = {
  provide: Processor,
  useExisting: forwardRef(() => ParentProcessorDirective),
};

@Directive({
  selector: `[i3eParentProcessor]`,
  providers: [i3eParentProcessor],
})
export class ParentProcessorDirective {
  constructor(
    @SkipSelf() parent: Processor,
  ) {
    return parent;
  }
}
