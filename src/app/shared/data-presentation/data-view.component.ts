import {
  Component, Input, Inject,
  Self,
} from '@angular/core';

import { Processor } from '@i3e/processor';

import { DataPresentation } from './data-presentation';

import { ActionsProcessorEngine, LinksProcessorEngine } from '../processor';

@Component({
  selector: 'cs-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: [ './data-view.component.less' ]
})
export class DataViewComponent
extends DataPresentation<ActionsProcessorEngine & LinksProcessorEngine> {
  private _backable: boolean;
  @Input('backable') set backable(value) {
    this._backable = ((value as any === '') || !!value);
  }

  constructor(
    @Inject(Processor) @Self() processor: ActionsProcessorEngine & LinksProcessorEngine,
  ) {
    super(processor);
    this._backable = false;
  }

  get backable() { return this._backable; }
}
