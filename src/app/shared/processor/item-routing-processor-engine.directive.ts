import {
  Directive, forwardRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProcessorEngine } from '@i3e/processor';

import { ItemProcessorEngine } from './item-processor-engine';

export const csItemRoutingProcessorEngineDirective = {
  provide: ProcessorEngine,
  useExisting: forwardRef(() => ItemRoutingProcessorEngineDirective),
  multi: true,
};

export const csItemRoutingItemProcessorEngineDirective = {
  provide: ItemProcessorEngine,
  useExisting: forwardRef(() => ItemRoutingProcessorEngineDirective),
};

@Directive({
  selector: '[csItemRoutingProcessor]',
  providers: [
    csItemRoutingProcessorEngineDirective,
    csItemRoutingItemProcessorEngineDirective,
  ],
})
export class ItemRoutingProcessorEngineDirective
implements ItemProcessorEngine {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {}

  readonly itemProcess = (params: any[], extra: {[key: string]: any}): void => {
console.debug('itemProcess:', params, extra, this._activatedRoute);
    this._router.navigate(params, Object.assign({relativeTo: this._activatedRoute}, extra));
  }
}
