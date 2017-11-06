import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '@consol/account';

import { Person } from '../model';

import { PersonService } from '../person.service';

export const CS_PERSON_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PersonControlComponent),
  multi: true,
};

export const CS_PERSON_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PersonControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-person-control:not([csPersonType])',
  templateUrl: '../template/person-control/person-control.component.html',
  styleUrls: [ '../template/person-control/person-control.component.less' ],
  providers: [
    CS_PERSON_CONTROL_VALUE_ACCESSOR,
    CS_PERSON_CONTROL_VALIDATORS,
  ],
})
export class PersonControlComponent extends AccountSearchableControl<Person> {
  constructor(
    ds: PersonService,
  ) {
    super(ds);
  }
}
