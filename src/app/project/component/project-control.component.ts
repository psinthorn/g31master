import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '@consol/account';

import { Project } from '../model';

import { ProjectService } from '../project.service';

export const csProjectControlValueAccessor: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ProjectControlComponent),
  multi: true,
};

export const csProjectControlValidators: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ProjectControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-project-control',
  templateUrl: '../template/project-control/project-control.component.html',
  styleUrls: [ '../template/project-control/project-control.component.less' ],
  providers: [
    csProjectControlValueAccessor,
    csProjectControlValidators,
  ],
})
export class ProjectControlComponent extends AccountSearchableControl<Project> {
  constructor(
    ds: ProjectService,
  ) {
    super(ds);
  }
}
