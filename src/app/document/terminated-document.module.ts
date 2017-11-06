import { NgModule } from '@angular/core';
import { I3eModule } from '@i3e';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { TerminatedDocumentFormService } from './terminated-document-form.service';

import { TerminatedDocumentService } from './terminated-document.service';

import { TerminatedDocumentFormRoutingProcessorDirective } from './processor';
import {
  DocumentCancelComponent, DocumentRejectComponent,
} from './component';

@NgModule({
  imports: [
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
  ],
  exports: [
    TerminatedDocumentFormRoutingProcessorDirective,
    DocumentCancelComponent, DocumentRejectComponent,
  ],
  declarations: [
    TerminatedDocumentFormRoutingProcessorDirective,
    DocumentCancelComponent, DocumentRejectComponent,
  ],
  providers: [
    TerminatedDocumentFormService,
    TerminatedDocumentService,
  ],
})
export class TerminatedDocumentModule { }
