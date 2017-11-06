import {
  Component, forwardRef, Inject,
  Input, Self,
} from '@angular/core';

import { Processor } from '@i3e/processor';

import { DataList } from './data-list';

import { DataPresentation } from './data-presentation';

import {
  ItemProcessorEngine,
  ActionsProcessorEngine, LinksProcessorEngine,
} from '../processor';

export const csDataListComponent = {
  provide: DataList,
  useExisting: forwardRef(() => DataListComponent),
};

@Component({
  selector: 'cs-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: [ './data-list.component.less' ],
  providers: [csDataListComponent],
})
export class DataListComponent
extends DataPresentation<ItemProcessorEngine & ActionsProcessorEngine & LinksProcessorEngine> {
  private _backable: boolean;
  @Input('backable') set backable(value) {
    this._backable = ((value as any === '') || !!value);
  }

  constructor(
    @Self() @Inject(Processor) processor: ItemProcessorEngine & ActionsProcessorEngine & LinksProcessorEngine,
  ) {
    super(processor);

    this._backable = false;

    setTimeout(() => {
      console.debug('processor:', this.processor);
    }, 3000);
  }

  get backable() { return this._backable; }

  itemProcess(params: any[], extra: {[key: string]: any}): void {
console.debug('data-list.component:', params, extra);
    if(typeof this.processor.itemProcess === 'function') {
console.debug('processor:', this.processor.itemProcess);
      this.processor.itemProcess(params, extra);
    } else {
      console.error(`itemProcess process not found in processor`, this.processor);
    }
  }
}
