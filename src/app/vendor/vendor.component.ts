import { Component, Injector } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { ItemDeleteConfirmComponent } from '@consol/shared';

import {
  ComponentInfoService,
  ItemRootBase,
  ItemListBase,
  ItemIndividualBase, ItemViewBase, ItemEditBase,
  ItemOnReadyMethod,
  ItemDeleteConfirmMethod,
  ModelFormCreate
} from '@consol/shared';

import { VendorFormService } from './vendor-form.service';
import { VendorService } from './vendor.service';
import { Vendor } from './model';

@Component({
  selector: 'cs-vendor-root',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.less'],
})
export class VendorComponent extends ItemRootBase {
  constructor(injector: Injector, depComp: ComponentInfoService){
    super(injector);
  }
}

@Component({
  selector: 'cs-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor.component.less'],
})
export class VendorListComponent extends ItemListBase<Vendor> {
  constructor(
    injector: Injector,
    ds: VendorService
  ){
    super(injector, ds);
  }

  showInfo(inx: number): void {
    let message = 'Not Found';
    let item = this.items[inx];
    if(item) message =`${ item.name }`;
    alert(message);
  }
}

@Component({
  selector: 'cs-vendor-item',
  templateUrl: './vendor-item.component.html',
  styleUrls: ['./vendor.component.less']
})
export class VendorItemComponent extends ItemIndividualBase<Vendor> {
  constructor(
    injector: Injector,
    ds: VendorService
  ){
    super(injector, ds);
  }
}

@Component({
  selector: 'cs-vendor-item-view',
  templateUrl: './vendor-item-view.component.html',
  styleUrls: ['./vendor.component.less']
})
export class VendorItemViewComponent
  extends ItemViewBase<Vendor, VendorItemComponent>
  implements ItemOnReadyMethod, ItemDeleteConfirmMethod {
  constructor(
    itemComponent: VendorItemComponent,
    protected dialog: MatDialog
  ){
    super(itemComponent);
  }

  itemOnReady() {
    if(this.item) this.itemComponent.componentInfoService.setValue('label', this.item.code);
  }

  itemDeleteConfirm() {
    let dialogRef = this.dialog.open(ItemDeleteConfirmComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.entityName = this.item.code;

    return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'cs-vendor-item-edit',
  templateUrl: './vendor-item-edit.component.html',
  styleUrls: ['./vendor.component.less']
})
export class VendorItemEditComponent
  extends ItemEditBase<Vendor, VendorItemComponent>
  implements ItemOnReadyMethod {
  constructor(
    itemComponent: VendorItemComponent,
    private formService: VendorFormService,
  ){
    super(itemComponent);
  }

  itemCreateForm(item: Vendor){
    return this.formService.formCreate(item);
  }

  itemOnReady() {
    if(this.form) this.itemComponent.componentInfoService.setValue('label',
      (this.form.value.id)? `${ this.form.value.code }-Edit` : 'New Vendor'
    );
  }
}
