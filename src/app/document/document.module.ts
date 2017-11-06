import { NgModule } from '@angular/core';
import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { AccountModule } from '@consol/account';

import { DocumentFormService } from './document-form.service';

import { DocumentService } from './document.service';

@NgModule({
  imports: [
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
    AccountModule,
  ],
  exports: [
    //DocumentControlComponent,
    //DocumentContextProcessorDirective,
  ],
  declarations: [
    //DocumentControlComponent,
    //DocumentContextProcessorDirective,
  ],
  providers: [
    DocumentFormService,
    DocumentService,
  ],
})
export class DocumentModule { }
