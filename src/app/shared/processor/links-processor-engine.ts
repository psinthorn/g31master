import { ProcessorEngine } from '@i3e/processor';

import { ProcessDescription } from './process-description.type';

export abstract class LinksProcessorEngine extends ProcessorEngine {
  readonly links: ProcessDescription[];
}
