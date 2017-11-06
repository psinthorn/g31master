import {
  Directive, Self, OnInit, OnDestroy,
  Input,
} from '@angular/core';

import { DataLoader } from '@i3e/data-loader';
import { StateLabelConfig, GlobalStateService } from '@i3e/global-state';

export const csRoutingStateDirectiveName: string = 'csRoutingState';

@Directive({
  selector: `[${ csRoutingStateDirectiveName }]`,
})
export class RoutingStateDirective<T> implements OnInit, OnDestroy {
  @Input(csRoutingStateDirectiveName) private name: string;

  constructor(
    @Self() private dataLoader: DataLoader<T>,
    private stateLabelConfig: StateLabelConfig,
    private globalStateService: GlobalStateService,
  ) {
    this.globalStateService.setValue('loading', true);
  }

  ngOnInit() {
    this.dataLoader.data$.subscribe((data) => {
      this.globalStateService.setValue({
        label: this.stateLabelConfig.for[this.name](data),
        error: null,
        loading: false,
      });
    }, (err) => {
      this.globalStateService.setValue({
        label: null,
        error: err.toString(),
        loading: false,
      });
    }, () => {
      this.globalStateService.setValue('loading', false);
    })
  }

  ngOnDestroy() {
    this.globalStateService.setValue({
      label: null,
      error: null,
      loading: false,
    });
  }
}
