import { Component } from '@angular/core';

import { Document } from './model';

// Stub service
import { TerminatedDocumentService } from './terminated-document.service';

@Component({
  selector: 'cs-document-cancel-routing',
  template: `<cs-document-cancel i3eDataLoader="dataPreloading" csTerminatedDocumentFormRoutingProcessor [dataService]="ds"></cs-document-cancel>`,
  styleUrls: ['./terminated-document-routing.component.less'],
})
export class DocumentCancelRoutingComponent<ET> {
  constructor(
    public ds: TerminatedDocumentService<ET>,
  ) { }
}

@Component({
  selector: 'cs-document-reject-routing',
  template: `<cs-document-reject i3eDataLoader="dataPreloading" csTerminatedDocumentFormRoutingProcessor [dataService]="ds"></cs-document-reject>`,
  styleUrls: ['./terminated-document-routing.component.less'],
})
export class DocumentRejectRoutingComponent<ET> {
  constructor(
    public ds: TerminatedDocumentService<ET>,
  ) { }
}
