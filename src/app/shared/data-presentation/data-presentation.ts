import { Processor } from '@i3e/processor';

export abstract class DataPresentation<T extends Processor> {
  constructor(
    private _processor: T,
  ) { }

  get processor(): T { return this._processor; }
}
