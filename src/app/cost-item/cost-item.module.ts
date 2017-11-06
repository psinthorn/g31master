import { NgModule } from '@angular/core';
//import { RouterModule } from '@angular/router';

import { SharedModule } from '@consol/shared';
import { CustomModule } from '@consol/custom';

import { I3eModule } from '@i3e';

import { AccountModule } from '@consol/account';

import { CostItemTypeRefModule } from './cost-item-type-ref.module';

import { CostItemFormService } from './cost-item-form.service';
import { CostItemService } from './cost-item.service';

import {
  CostItemControlComponent,

  CostItemListComponent,
  CostItemItemComponent, CostItemItemViewComponent, CostItemItemFormComponent,
} from './component';

// stub data
import { CostItemStubService } from './cost-item.stub-service';

@NgModule({
  imports: [
    //RouterModule,
    I3eModule,
    SharedModule,
    CustomModule,
    //MaterialModule, // now use from shared module
    AccountModule,
    CostItemTypeRefModule,
  ],
  exports: [
    CostItemControlComponent,

    CostItemListComponent,
    CostItemItemComponent, CostItemItemViewComponent, CostItemItemFormComponent,
  ],
  declarations: [
    CostItemControlComponent,

    CostItemListComponent,
    CostItemItemComponent, CostItemItemViewComponent, CostItemItemFormComponent,
  ],
  providers: [
    CostItemFormService,
    { provide: CostItemService, useClass: CostItemStubService },
  ],
})
export class CostItemModule { }
