import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';

import { I3eModule } from '@i3e';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { CostItemTypeRefFormService } from './cost-item-type-ref-form.service';
import { CostItemTypeRefService } from './cost-item-type-ref.service';

import { CostItemTypeRefControlComponent } from './component';

import {
  CostItemTypeRefListComponent,
  CostItemTypeRefItemComponent, CostItemTypeRefItemViewComponent, CostItemTypeRefItemEditComponent,
} from './component';

// stub data
import { CostItemTypeRefStubService } from './cost-item-type-ref.stub-service';

@NgModule({
  imports: [
    //RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
  ],
  exports: [
    CostItemTypeRefControlComponent,

    CostItemTypeRefListComponent,
    CostItemTypeRefItemComponent, CostItemTypeRefItemViewComponent, CostItemTypeRefItemEditComponent,
  ],
  declarations: [
    CostItemTypeRefControlComponent,

    CostItemTypeRefListComponent,
    CostItemTypeRefItemComponent, CostItemTypeRefItemViewComponent, CostItemTypeRefItemEditComponent,
  ],
  providers: [
    CostItemTypeRefFormService,
    { provide: CostItemTypeRefService, useClass: CostItemTypeRefStubService },
  ],
})
export class CostItemTypeRefModule { }
