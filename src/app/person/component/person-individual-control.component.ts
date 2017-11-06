import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '@consol/account';

import { Person } from '../model';

import { PersonIndividualService } from '../person-individual.service';

export const CS_PERSON_INDIVIDUAL_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PersonIndividualControlComponent),
  multi: true,
};

export const CS_PERSON_INDIVIDUAL_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PersonIndividualControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-person-control[csPersonType="individual"]',
  templateUrl: '../template/person-control/person-control.component.html',
  styleUrls: [ '../template/person-control/person-control.component.less' ],
  providers: [
    CS_PERSON_INDIVIDUAL_CONTROL_VALUE_ACCESSOR,
    CS_PERSON_INDIVIDUAL_CONTROL_VALIDATORS,
  ],
})
export class PersonIndividualControlComponent extends AccountSearchableControl<Person> {
  constructor(
    ds: PersonIndividualService,
  ) {
    super(ds);
  }
}
