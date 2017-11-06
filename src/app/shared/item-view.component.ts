import { Component, Input } from '@angular/core';

import { MetaDataBase } from './model';
import { ItemCoreComponent } from './item-core.component';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: [ './item-view.component.less' ]
})
export class ItemViewComponent extends ItemCoreComponent {
  /*
  @Input('metaData') protected _metaData;
  @Input('operators') protected _operators?;
  */
}
