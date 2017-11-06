import { Directive, Input, HostListener } from '@angular/core';

import { DataList } from './data-list';

const directiveName = 'csDataListSelected';

@Directive({
  selector: `[${ directiveName }]`,
})
export class DataListSelectedDirective {
  @Input(directiveName) private params: any[];
  @Input('extra') private extra: {[key: string]: any};

  constructor(
    private dataList: DataList,
  ) {
    this.params = null;
    this.extra = null;
  }

  @HostListener('click')
  onClick() {
console.debug('data-list-selected:', this.params, this.extra);
    this.dataList.itemProcess(this.params, this.extra);
  }
}
