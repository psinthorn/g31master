import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

//import { MaterialModule } from '@angular/material';

import { ProjectBoqBudgetTypeFormService } from './project-boq-budget-type-form.service';
import { ProjectBoqDataBudgetFormService } from './project-boq-data-budget-form.service';
import { ProjectBoqDataFormService } from './project-boq-data-form.service';
import { ProjectBoqFormService } from './project-boq-form.service';

import {
  ProjectBoqDataComponent,

  ProjectBoqListComponent,
  ProjectBoqItemComponent,
  ProjectBoqItemViewComponent, ProjectBoqItemEditComponent,
} from './component';

@NgModule({
  imports: [
    RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // must be specific later, now use from SharedModule
  ],
  exports: [
    ProjectBoqDataComponent,

    ProjectBoqListComponent,
    ProjectBoqItemComponent,
    ProjectBoqItemViewComponent, ProjectBoqItemEditComponent,
  ],
  declarations: [
    ProjectBoqDataComponent,

    ProjectBoqListComponent,
    ProjectBoqItemComponent,
    ProjectBoqItemViewComponent, ProjectBoqItemEditComponent,
  ],
  providers: [
    ProjectBoqBudgetTypeFormService,
    ProjectBoqDataBudgetFormService,
    ProjectBoqDataFormService,
    ProjectBoqFormService,
  ],
})
export class ProjectBoqModule { }
