import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared/shared.module';
import { CustomModule } from '@consol/custom';

import { AccountModule } from '@consol/account';

import { PersonFormService } from './person-form.service';
import { PersonIndividualFormService } from './person-individual-form.service';
import { PersonCorporateFormService } from './person-corporate-form.service';

import { PersonService } from './person.service';
import { PersonIndividualService } from './person-individual.service';
import { PersonCorporateService } from './person-corporate.service';

import { PersonStubService } from './person.stub-service';
import { PersonIndividualStubService } from './person-individual.stub-service';
import { PersonCorporateStubService } from './person-corporate.stub-service';

import {
  PersonControlComponent,
  PersonIndividualControlComponent,
  PersonCorporateControlComponent,

  PersonListComponent,
  PersonSelectComponent,

  PersonCorporateItemComponent,
  PersonCorporateItemViewComponent, PersonCorporateItemFormComponent,

  PersonIndividualItemComponent,
  PersonIndividualItemViewComponent, PersonIndividualItemFormComponent,
} from './component';

@NgModule({
  imports: [
    RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
    AccountModule,
  ],
  exports: [
    PersonControlComponent,
    PersonIndividualControlComponent,
    PersonCorporateControlComponent,

    PersonListComponent,
    PersonSelectComponent,

    PersonCorporateItemComponent,
    PersonCorporateItemViewComponent, PersonCorporateItemFormComponent,

    PersonIndividualItemComponent,
    PersonIndividualItemViewComponent, PersonIndividualItemFormComponent,
  ],
  declarations: [
    PersonControlComponent,
    PersonIndividualControlComponent,
    PersonCorporateControlComponent,

    PersonListComponent,
    PersonSelectComponent,

    PersonCorporateItemComponent,
    PersonCorporateItemViewComponent, PersonCorporateItemFormComponent,

    PersonIndividualItemComponent,
    PersonIndividualItemViewComponent, PersonIndividualItemFormComponent,
  ],
  providers: [
    PersonFormService, PersonIndividualFormService, PersonCorporateFormService,
    { provide: PersonService, useClass: PersonStubService },
    { provide: PersonIndividualService, useClass: PersonIndividualStubService },
    { provide: PersonCorporateService, useClass: PersonCorporateStubService },
  ],
})
export class PersonModule { }
