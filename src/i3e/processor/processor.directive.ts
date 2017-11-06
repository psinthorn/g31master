import { Directive, Inject, forwardRef, OnInit } from '@angular/core';

import { Processor } from './processor';
import { ProcessorEngine } from './processor-engine';

const ie3Processor = {
  provide: Processor,
  useExisting: forwardRef(() => ProcessorDirective),
};

function comparator(engine1: ProcessorEngine, engine2: ProcessorEngine) {
  const priority1 = engine1.priority || 9999;
  const priority2 = engine2.priority || 9999;

  return +(priority1 > priority2) - +(priority1 < priority2);
}

@Directive({
  selector: '[i3eProcessor]',
  providers: [ie3Processor],
})
export class ProcessorDirective implements Processor, OnInit {
  constructor(
    @Inject(ProcessorEngine) private _engines: ProcessorEngine[],
  ) {
    this._engines.sort(comparator);
  }

  ngOnInit() {
    this._engines.forEach((engine) => {
      Object.keys(engine).forEach((key) => {
        if(key === 'priority') return;
        if(key[0] === '_') return;
        Object.defineProperty(this, key, {
          configurable: false,
          enumerable: true,
          get: () => {
            return engine[key];
          },
        });
      });
    });
  }
}
