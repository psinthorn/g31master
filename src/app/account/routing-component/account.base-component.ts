import { Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { ItemDeleteConfirmComponent } from '@consol/shared';

import {
  ComponentInfoService,
  ItemRootBase,
  ItemListBase,
  ItemIndividualBase, ItemViewBase, ItemEditBase,
  ItemOnReadyMethod,
  ItemDeleteConfirmMethod,
  ItemReferenceCodeProperty,
  DataService,
  ModelFormCreate,
} from '@consol/shared';

import { Account } from '../model';

export abstract class AccountRootBase extends ItemRootBase {
  constructor(injector: Injector){
    super(injector);
  }
}

export abstract class AccountListBase<T extends Account>
  extends ItemListBase<T> {
  constructor(
    injector: Injector,
    ds: DataService<T>,
  ){
    super(injector, ds);
  }
}

export abstract class AccountItemBase<T extends Account>
  extends ItemIndividualBase<T>
  implements ItemReferenceCodeProperty {
  static get entityName() { return 'Account'; }

  private _refCode: string;

  constructor(
    injector: Injector,
    ds: DataService<T>
  ){
    super(injector, ds);

    this._refCode = void 0;
  }

  protected _itemReady(item: T): void {
    if(!this.isNew) this._refCode = item.code;

    super._itemReady(item);
  }

  get refCode() { return this._refCode; }
}

export abstract class AccountItemViewBase<T extends Account, E extends AccountItemBase<T>>
  extends ItemViewBase<T, E>
  implements ItemOnReadyMethod, ItemDeleteConfirmMethod {
  constructor(
    itemComponent: E,
    protected dialog: MatDialog
  ){
    super(itemComponent);
  }

  itemOnReady(): void {
    if(this.item) this.itemComponent.componentInfoService.setValue('label', this.item.code);
  }

  itemDeleteConfirm(): Observable<any> {
    let dialogRef = this.dialog.open(ItemDeleteConfirmComponent, {
      disableClose: true
    });

    dialogRef.componentInstance.entityName = this.item.code;

    return dialogRef.afterClosed();
  }
}

export class AccountItemEditBase<T extends Account, E extends AccountItemBase<T>>
  extends ItemEditBase<T, E>
  implements ItemOnReadyMethod {
  constructor(
    itemComponent: E,
    protected formService: ModelFormCreate<T>,
  ){
    super(itemComponent);
  }

  itemCreateForm(item: T): FormGroup  {
    return this.formService.mfCreate(item);
  }

  itemOnReady(): void {
    if(this.form) this.itemComponent.componentInfoService.setValue('label',
      (this.itemComponent.isNew)?
        'New ' + (<typeof AccountItemBase>this.itemComponent.constructor).entityName
      :
        `Edit ${ this.itemComponent.refCode }`
    );
  }
}
