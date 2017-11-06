import { Processor } from './processor';

export abstract class ProcessorEngine extends Processor {
  readonly priority?: number;
}
