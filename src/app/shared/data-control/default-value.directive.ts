import { Directive, Self, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

export const csDefaultValueDirectiveName: string = 'csDefaultValue';

@Directive({
  selector: `[${ csDefaultValueDirectiveName }]`,
  exportAs: 'csDefaultValue',
})
export class DefaultValueDirective implements OnInit {
  @Input(csDefaultValueDirectiveName) private converterFn: Function;

  constructor(
    @Self() private loader: DataLoader<any>,
    private control: NgControl,
  ) { }

  ngOnInit() {
    this.loader.data$.subscribe((value) => {
      if(!this.control.value) {
        if(typeof this.converterFn === 'function') {
          this.control.control.setValue(this.converterFn(value));
        } else {
          this.control.control.setValue(value);
        }
      }
    });
  }
}
