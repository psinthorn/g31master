import { NgModule }             from '@angular/core';
import { I3eModule } from '@i3e';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { EmployeeModule } from './employee.module';
import { PersonModule } from '@consol/person';

import {
  EmployeeRoutingComponent,
  EmployeeListRoutingComponent,
  EmployeeItemRoutingComponent, EmployeeItemViewRoutingComponent, EmployeeItemFormRoutingComponent,
} from './employee-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    EmployeeModule,
    PersonModule,
    RouterModule.forChild([
      { path: '', component: EmployeeRoutingComponent,
        children: [
          { path: '', component: EmployeeListRoutingComponent },
          { path: 'add', component: EmployeeItemRoutingComponent,
            children: [
              { path: '', component: EmployeeItemFormRoutingComponent, data: {label: 'ADD EMPLOYEE'} }
            ]
          },
          { path: ':id', component: EmployeeItemRoutingComponent,
            children: [
              { path: '', component: EmployeeItemViewRoutingComponent, data: {label: 'EMPLOYEE (View)' } },
              { path: 'edit', component: EmployeeItemFormRoutingComponent, data: {label: 'EMPLOYEE (Edit)'} },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    EmployeeRoutingComponent,
    EmployeeListRoutingComponent,
    EmployeeItemRoutingComponent, EmployeeItemViewRoutingComponent, EmployeeItemFormRoutingComponent,
  ],
})
export class EmployeeRoutingModule {}
