import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { MaterialModule } from '@angular/material';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { ProjectBoqModule } from './project-boq.module';

import {
  ProjectBoqRoutingComponent,
  ProjectBoqListRoutingComponent,
  ProjectBoqItemRoutingComponent,
  ProjectBoqItemViewRoutingComponent, ProjectBoqItemEditRoutingComponent,
} from './project-boq-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    ProjectBoqModule,

    RouterModule.forChild([
      { path: '', component: ProjectBoqRoutingComponent,
        children: [
          { path: '', component: ProjectBoqListRoutingComponent },
          { path: 'add', component: ProjectBoqItemRoutingComponent,
            children: [
              { path: '', component: ProjectBoqItemEditRoutingComponent,
                data: { label: 'Add Project BOQ'}
              },
            ]
          },
          { path: ':id', component: ProjectBoqItemRoutingComponent,
            children: [
              { path: '', component: ProjectBoqItemViewRoutingComponent,
                data: { label: 'View Project BOQ' }
              },
              { path: 'edit', component: ProjectBoqItemEditRoutingComponent,
                data: { label: 'Edit Project BOQ' }
              },
            ]
          },
        ]
      },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    ProjectBoqRoutingComponent,
    ProjectBoqListRoutingComponent,
    ProjectBoqItemRoutingComponent,
    ProjectBoqItemViewRoutingComponent, ProjectBoqItemEditRoutingComponent,
  ],
})
export class ProjectBoqRoutingModule {}
