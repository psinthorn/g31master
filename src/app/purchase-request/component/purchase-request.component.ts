import { Component, Self } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// RxJS static method
import 'rxjs/add/observable/of';

import { DataLoader } from '@i3e/data-loader';

import { ItemDeleteConfirmComponent } from '@consol/shared';

import { Project, ProjectBoq } from '@consol/project';
import { PurchaseRequest, PurchaseRequestDetail } from '../model';

import { PurchaseRequestFormService } from '../purchase-request-form.service';
import { PurchaseRequestService } from '../purchase-request.service';

@Component({
  selector: 'cs-purchase-request-list',
  templateUrl: './purchase-request-list.component.html',
  styleUrls: ['./purchase-request.component.less'],
})
export class PurchaseRequestListComponent {
  private _items: PurchaseRequest[];

  constructor(
    @Self() private loader: DataLoader<PurchaseRequest[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }

  getIconName(item: PurchaseRequest): string {
    if(item.terminated) return 'delete_forever';
    if(item.approved) return 'assignment_turned_in';

    return 'assignment';
  }

  getIconColor(item: PurchaseRequest): string {
    if(item.terminated) return 'warn';
    if(item.approved) return 'primary';

    return 'assignment';
  }
}

@Component({
  selector: 'cs-purchase-request-item',
  templateUrl: './purchase-request-item.component.html',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemComponent {
  constructor(
    @Self() private loader: DataLoader<PurchaseRequest>,
  ) { }
}

@Component({
  selector: 'cs-purchase-request-item-view',
  templateUrl: './purchase-request-item-view.component.html',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemViewComponent {
  private _item: PurchaseRequest;

  constructor(
    @Self() private loader: DataLoader<PurchaseRequest>,
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
  selector: 'cs-purchase-request-item-replace',
  templateUrl: './purchase-request-item-replace.component.html',
  styleUrls: ['./purchase-request.component.less']
})
export class PurchaseRequestItemReplaceComponent {
  private _createDetail: Function;

  public form: FormGroup;

  private projectBoqsSubject: Subject<ProjectBoq[]>;
  private projectBoqsObservable: Observable<ProjectBoq[]>;

  constructor(
    @Self() private loader: DataLoader<PurchaseRequest>,
    private fb: FormBuilder,
    private formService: PurchaseRequestFormService,
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

  itemCreateForm(item: PurchaseRequest){
    const form = this.formService.formCreate(item);

    return form;
  }

  itemCreateDetail(detail?: PurchaseRequestDetail) {
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

  itemOnReady() {
    /*
    if(this.form) this.itemComponent.componentInfoService.setValue('label',
      (this.form.value.id)? `${ this.form.value.code }-Edit` : 'New PR สร้างเอกสารขอซื้อ'
    );
    */
  }
}
