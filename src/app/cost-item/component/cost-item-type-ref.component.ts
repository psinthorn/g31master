import { Component, Self } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

// RxJS operators
import 'rxjs/add/operator/switchMap';

import { DataLoader } from '@i3e/data-loader';

import { CostItemTypeRefFormService } from '../cost-item-type-ref-form.service';
import { CostItemTypeRef } from '../model';

@Component({
  selector: 'cs-cost-item-type-ref-list',
  templateUrl: '../template/cost-item-type-ref/cost-item-type-ref-list.component.html',
  styleUrls: ['../template/cost-item-type-ref/cost-item-type-ref.component.less'],
})
export class CostItemTypeRefListComponent {
  private _items: CostItemTypeRef[];

  constructor(
    @Self() private loader: DataLoader<CostItemTypeRef[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}

@Component({
  selector: 'cs-cost-item-type-ref-item',
  templateUrl: '../template/cost-item-type-ref/cost-item-type-ref-item.component.html',
  styleUrls: ['../template/cost-item-type-ref/cost-item-type-ref.component.less']
})
export class CostItemTypeRefItemComponent {
  constructor(
    @Self() private loader: DataLoader<CostItemTypeRef>,
  ) { }
}

@Component({
  selector: 'cs-cost-item-type-ref-item-view',
  templateUrl: '../template/cost-item-type-ref/cost-item-type-ref-item-view.component.html',
  styleUrls: ['../template/cost-item-type-ref/cost-item-type-ref.component.less'],
})
export class CostItemTypeRefItemViewComponent {
  private _item: CostItemTypeRef;

  constructor(
    @Self() private loader: DataLoader<CostItemTypeRef>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-cost-item-type-ref-item-edit',
  templateUrl: '../template/cost-item-type-ref/cost-item-type-ref-item-edit.component.html',
  styleUrls: ['../template/cost-item-type-ref/cost-item-type-ref.component.less']
})
export class CostItemTypeRefItemEditComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<CostItemTypeRef>,
    private formService: CostItemTypeRefFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  itemCreateForm(item: CostItemTypeRef){
    const form = this.formService.formCreate(item);

    return form;
  }
}
