import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// RxJS static method
import 'rxjs/add/observable/of';

import { DataLoader } from '@i3e/data-loader';

import { ItemDeleteConfirmComponent } from '@consol/shared';

import { Project, ProjectBoq } from '@consol/project';
import { PurchaseOrder, PurchaseOrderDetail } from '../model';

import { PurchaseOrderFormService } from '../purchase-order-form.service';
import { PurchaseOrderService } from '../purchase-order.service';

@Component({
  selector: 'cs-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order.component.less'],
})
export class PurchaseOrderListComponent {
  private _items: PurchaseOrder[];

  constructor(
    @Self() private loader: DataLoader<PurchaseOrder[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}

@Component({
  selector: 'cs-purchase-order-item',
  templateUrl: './purchase-order-item.component.html',
  styleUrls: ['./purchase-order.component.less']
})
export class PurchaseOrderItemComponent {
  constructor(
    @Self() private loader: DataLoader<PurchaseOrder>,
  ) { }
}

@Component({
  selector: 'cs-purchase-order-item-view',
  templateUrl: './purchase-order-item-view.component.html',
  styleUrls: ['./purchase-order.component.less']
})
export class PurchaseOrderItemViewComponent {
  private _item: PurchaseOrder;

  constructor(
    @Self() private loader: DataLoader<PurchaseOrder>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }

  itemOnReady() {
    //if(this.item) this.itemComponent.componentInfoService.setValue('label', this.item.code);
  }

  itemDeleteConfirm() {
    //let dialogRef = this._dialog.open(ItemDeleteConfirmComponent, {
    //  disableClose: true
    //});

    //dialogRef.componentInstance.entityName = this.item.code;

    //return dialogRef.afterClosed();
  }
}

@Component({
  selector: 'cs-purchase-order-item-replace',
  templateUrl: './purchase-order-item-replace.component.html',
  styleUrls: ['./purchase-order.component.less']
})
export class PurchaseOrderItemReplaceComponent {
  private _createDetail: Function;

  public form: FormGroup;

  private projectBoqsSubject: Subject<ProjectBoq[]>;
  private projectBoqsObservable: Observable<ProjectBoq[]>;

  constructor(
    @Self() private loader: DataLoader<PurchaseOrder>,
    private formService: PurchaseOrderFormService,
  ) {
    this._createDetail = this.itemCreateDetail.bind(this);
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });

    this.projectBoqsSubject = new BehaviorSubject<ProjectBoq[]>([]);
    this.projectBoqsObservable = this.projectBoqsSubject.asObservable();
  }

  get createDetail() { return this._createDetail; }
  get projectBoqs$() { return this.projectBoqsObservable; }

  itemCreateForm(item: PurchaseOrder){
    const form = this.formService.formCreate(item);

    return form;
  }

  itemCreateDetail(detail?: PurchaseOrderDetail) {
    return this.formService.createDetail(detail);
  }

  createBoqObservable(boqs) {
    return Observable.of(boqs);
  }

  getCostItemPlaceholderSuffix(index: number): string {
    const costItem = this.form.get(`details.${ index }.costItem`).value;
    if(costItem) return ` (${ costItem.code })`;

    return '';
  }

  getCostItemHint(detailFormGroup: FormGroup): string {
    let purchaseRequestDetail;
    if(purchaseRequestDetail = detailFormGroup.get('statusChanged').value.purchaseRequestDetail) {
      if(purchaseRequestDetail.costItem) {
        return `(${ purchaseRequestDetail.costItem.code }) ${ purchaseRequestDetail.costItem.name }/${ purchaseRequestDetail.costItem.unit }`;
      } else {
        return `${ purchaseRequestDetail.name }/${purchaseRequestDetail.unit }`;
      }
    }

    return null;
  }

  toggleRemoved(detailFormGroup: FormGroup): void {
    const removedControl = detailFormGroup.get('statusChanged.removed');

    removedControl.setValue(!removedControl.value);
  }

  itemOnReady() {
    /*
    if(this.form) this.itemComponent.componentInfoService.setValue('label',
      (this.form.value.id)? `${ this.form.value.code }-Edit` : 'New PR สร้างเอกสารขอซื้อ'
    );
    */
  }

  getVat(item: any) {
    return item.vat;
  }
}
