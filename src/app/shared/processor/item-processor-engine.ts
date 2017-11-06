import { ProcessorEngine } from '@i3e/processor';

export abstract class ItemProcessorEngine extends ProcessorEngine {
  readonly itemProcess: (params: any[], extra?: {[key: string]: any}) => void;
}
