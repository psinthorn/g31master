import { ProcessorEngine } from '@i3e/processor';

export abstract class DataLoaderProcessorEngine<T> extends ProcessorEngine {
  readonly searchable: boolean;
  readonly pgData: {[key: string]: any};
  readonly data: T;
  readonly reload: () => void;
}
