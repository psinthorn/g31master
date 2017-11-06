import { NgModule }             from '@angular/core';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { I3eModule } from '@i3e';

import { PersonModule } from './person.module';

import {
  PersonRoutingComponent,
  PersonSelectRoutingComponent,
  PersonListRoutingComponent,
  PersonIndividualItemRoutingComponent, PersonIndividualItemViewRoutingComponent, PersonIndividualItemFormRoutingComponent,
  PersonCorporateItemRoutingComponent, PersonCorporateItemViewRoutingComponent, PersonCorporateItemFormRoutingComponent
} from './person-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    PersonModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    RouterModule.forChild([
      { path: '', component: PersonRoutingComponent,
        children: [
          { path: '', component: PersonListRoutingComponent },
          { path: 'add', component: PersonSelectRoutingComponent,
            data: { label: 'Person Select' }
          },
          { path: 'add/individual', component: PersonIndividualItemRoutingComponent,
            data: {
              label: 'บุคคลธรรมดา',
              description: 'ข้อมูลบุคคลธรรมดา',
              selectedType: 'person'
            },
            children: [
              { path: '', component: PersonIndividualItemFormRoutingComponent,
                data: {label: 'ADD INDIVIDUAL PERSON' }
              },
            ]
          },
          { path: 'add/corporate', component: PersonCorporateItemRoutingComponent,
            data: {
              label: 'นิติบุคคล',
              description: 'ข้อมูลนิติบุคคล',
              selectedType: 'person'
            },
            children: [
              { path: '', component: PersonCorporateItemFormRoutingComponent,
                data: { label: 'ADD CORPORATE PERSON' }
              },
            ]
          },
          { path: ':id/individual', component: PersonIndividualItemRoutingComponent,
            children: [
              { path: '', component: PersonIndividualItemViewRoutingComponent,
                data: { label: 'INDIVIDUAL PERSON(View)' }
              },
              { path: 'edit', component: PersonIndividualItemFormRoutingComponent,
                data: { label: 'INDIVIDUAL PERSON(Edit)'}
              },
            ]
          },
          { path: ':id/corporate', component: PersonCorporateItemRoutingComponent,
            children: [
              { path: '', component: PersonCorporateItemViewRoutingComponent,
                data: { label: 'CORPORATE PERSON(View)' }
              },
              { path: 'edit', component: PersonCorporateItemFormRoutingComponent,
                data: { label: 'CORPORATE PERSON(Edit)'}
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    PersonRoutingComponent,
    PersonSelectRoutingComponent,
    PersonListRoutingComponent,
    PersonIndividualItemRoutingComponent, PersonIndividualItemViewRoutingComponent, PersonIndividualItemFormRoutingComponent,
    PersonCorporateItemRoutingComponent, PersonCorporateItemViewRoutingComponent, PersonCorporateItemFormRoutingComponent
  ]
})
export class PersonRoutingModule {}
