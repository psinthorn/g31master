import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

//import { MaterialModule } from '@angular/material';

import { AccountModule } from '@consol/account';

import { PersonModule } from '@consol/person';
import { EmployeeModule } from '@consol/employee';

import { ProjectFormService } from './project-form.service';
import { ProjectService } from './project.service';

import { ProjectItemLoaderDirective } from './directive';

import {
  ProjectControlComponent,
  ProjectBoqControlComponent,
  ProjectBoqBudgetTypeControlComponent,
  ProjectBoqDataControlComponent,

  ProjectListComponent,
  ProjectItemComponent,
  ProjectItemViewComponent, ProjectItemEditComponent,
} from './component';

// stub data
import { ProjectStubService } from './project.stub-service';

@NgModule({
  imports: [
    //RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    AccountModule,
    PersonModule,
    EmployeeModule,
  ],
  exports: [
    ProjectItemLoaderDirective,

    ProjectControlComponent,
    ProjectBoqControlComponent,
    ProjectBoqBudgetTypeControlComponent,
    ProjectBoqDataControlComponent,

    ProjectListComponent,
    ProjectItemComponent,
    ProjectItemViewComponent, ProjectItemEditComponent,
  ],
  declarations: [
    ProjectItemLoaderDirective,

    ProjectControlComponent,
    ProjectBoqControlComponent,
    ProjectBoqBudgetTypeControlComponent,
    ProjectBoqDataControlComponent,

    ProjectListComponent,
    ProjectItemComponent,
    ProjectItemViewComponent, ProjectItemEditComponent,
  ],
  providers: [
    ProjectFormService,
    { provide: ProjectService, useClass: ProjectStubService },
  ],
})
export class ProjectModule { }
