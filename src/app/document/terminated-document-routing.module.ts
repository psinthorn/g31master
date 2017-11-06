import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';
//import { MaterialModule } from '@angular/material';

import { TerminatedDocumentModule } from './terminated-document.module';

import {
  DocumentCancelRoutingComponent,
  DocumentRejectRoutingComponent,
} from './terminated-document-routing.component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    TerminatedDocumentModule,
    //MaterialModule, // must be specific later, now use from SharedModule
    RouterModule.forChild([
      { path: 'cancel', component: DocumentCancelRoutingComponent, data: { label: 'Cancel Document' } },
      { path: 'reject', component: DocumentRejectRoutingComponent, data: { label: 'Reject Document' } },
    ])
  ],
  exports: [RouterModule],
  declarations: [
    DocumentCancelRoutingComponent,
    DocumentRejectRoutingComponent,
  ],
})
export class TerminatedDocumentRoutingModule {}
