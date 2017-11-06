import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { AccountModule } from '@consol/account/account.module';
import { PersonModule } from '@consol/person/';

import { EmployeeFormService } from './employee-form.service';
import { EmployeeService } from './employee.service';

import {
  EmployeeControlComponent, EmployeeArrayControlComponent,
  EmployeeListComponent,
  EmployeeItemComponent, EmployeeItemViewComponent, EmployeeItemFormComponent,
} from './component';

// implements
import { EmployeeStubService } from './employee.stub-service';

@NgModule({
  imports: [
    RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // TODO: use from separated module
    AccountModule,
    PersonModule,
  ],
  exports: [
    EmployeeControlComponent, EmployeeArrayControlComponent,
    EmployeeListComponent,
    EmployeeItemComponent, EmployeeItemViewComponent, EmployeeItemFormComponent,
  ],
  declarations: [
    EmployeeControlComponent, EmployeeArrayControlComponent,
    EmployeeListComponent,
    EmployeeItemComponent, EmployeeItemViewComponent, EmployeeItemFormComponent,
  ],
  providers: [
    EmployeeFormService, { provide: EmployeeService, useClass: EmployeeStubService },
  ],
})
export class EmployeeModule { }
