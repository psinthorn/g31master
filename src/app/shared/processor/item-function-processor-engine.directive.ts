import {
  Directive, forwardRef, Input,
} from '@angular/core';

import { ProcessorEngine } from '@i3e/processor';

import { ItemProcessorEngine } from './item-processor-engine';

export const csItemFunctionProcessorEngineDirective = {
  provide: ProcessorEngine,
  useExisting: forwardRef(() => ItemFunctionProcessorEngineDirective),
  multi: true,
};

export const csItemFunctionItemProcessorEngineDirective = {
  provide: ItemProcessorEngine,
  useExisting: forwardRef(() => ItemFunctionProcessorEngineDirective),
};

@Directive({
  selector: '[csItemFunctionProcessor]',
  providers: [
    csItemFunctionProcessorEngineDirective,
    csItemFunctionItemProcessorEngineDirective,
  ],
})
export class ItemFunctionProcessorEngineDirective
implements ItemProcessorEngine {
  @Input('csItemProcess') private itemProcessFn: Function;

  constructor() {}

  readonly itemProcess = (params: any[]): void => {
    this.itemProcessFn(params);
  }
}
