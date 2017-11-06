import { ProcessorEngine } from '@i3e/processor';

import { ProcessDescription } from './process-description.type';

export abstract class ActionsProcessorEngine extends ProcessorEngine {
  readonly actions: ProcessDescription[];
}
