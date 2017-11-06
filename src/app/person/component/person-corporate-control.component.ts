import { Component, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';

import { AccountSearchableControl } from '@consol/account';

import { Person } from '../model';

import { PersonCorporateService } from '../person-corporate.service';

export const CS_PERSON_CORPORATE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PersonCorporateControlComponent),
  multi: true,
};

export const CS_PERSON_CORPORATE_CONTROL_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => PersonCorporateControlComponent),
  multi: true,
}

@Component({
  selector: 'cs-person-control[csPersonType="corporate"]',
  templateUrl: '../template/person-control/person-control.component.html',
  styleUrls: [ '../template/person-control/person-control.component.less' ],
  providers: [
    CS_PERSON_CORPORATE_CONTROL_VALUE_ACCESSOR,
    CS_PERSON_CORPORATE_CONTROL_VALIDATORS,
  ],
})
export class PersonCorporateControlComponent extends AccountSearchableControl<Person> {
  constructor(
    ds: PersonCorporateService,
  ) {
    super(ds);
  }
}
