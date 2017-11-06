import { NgModule }             from '@angular/core';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { ProjectModule } from './project.module';

import { PersonModule } from '@consol/person';
import { EmployeeModule } from '@consol/employee';

import {
  ProjectRoutingComponent,
  ProjectListRoutingComponent,
  ProjectItemRoutingComponent, ProjectItemViewRoutingComponent, ProjectItemEditRoutingComponent,
} from './project-routing.component';


// For Test only
import { AccountModule } from '@consol/account';


@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    AccountModule,
    ProjectModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    PersonModule,
    EmployeeModule,

    RouterModule.forChild([
      { path: '', component: ProjectRoutingComponent,
        children: [
          { path: '', component: ProjectListRoutingComponent },
          { path: 'add', component: ProjectItemRoutingComponent,
            children: [
              { path: '', component: ProjectItemEditRoutingComponent,
                data: { label: 'Add Project'}
              },
            ]
          },
          { path: ':id', component: ProjectItemRoutingComponent,
            children: [
              { path: '', component: ProjectItemViewRoutingComponent,
                data: { label: 'View Project' }
              },
              { path: 'edit', component: ProjectItemEditRoutingComponent,
                data: { label: 'Edit Project' }
              },
              { path: 'boq', loadChildren: './project-boq-routing.module#ProjectBoqRoutingModule',
                data: { label: 'Project BOQ' }
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    ProjectRoutingComponent,
    ProjectListRoutingComponent,
    ProjectItemRoutingComponent, ProjectItemViewRoutingComponent, ProjectItemEditRoutingComponent,
  ],
})
export class ProjectRoutingModule {}
