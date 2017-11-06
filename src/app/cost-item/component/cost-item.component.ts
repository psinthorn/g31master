import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';

// RxJS methods
import 'rxjs/observable/of';

import { DataLoader } from '@i3e/data-loader';

import { CostItem, CostItemTypeRef } from '../model';

import { CostItemFormService } from '../cost-item-form.service';
import { CostItemService } from '../cost-item.service';

@Component({
  selector: 'cs-cost-item-list',
  templateUrl: '../template/cost-item/cost-item-list.component.html',
  styleUrls: ['../template/cost-item/cost-item.component.less'],
})
export class CostItemListComponent {
  private _items: CostItem[];

  constructor(
    @Self() private loader: DataLoader<CostItem[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }

  itemOnReady() {
    // if(!this.metaData.metaActions) this.metaData.metaActions = {};
    // this.metaData.metaActions['type'] = { icon: 'add', color: 'primary', label: 'Type' };
  }

  getTypeName(type: string): string {
    /*
    if(this.metaData && this.metaData.references && this.metaData.references.type && this.metaData.references.type[type]) {
      return this.metaData.references.type[type].name;
    }
    */

    return void 0;
  }
}

@Component({
  selector: 'cs-cost-item-item',
  templateUrl: '../template/cost-item/cost-item-item.component.html',
  styleUrls: ['../template/cost-item/cost-item.component.less'],
})
export class CostItemItemComponent {
  constructor(
    @Self() private loader: DataLoader<CostItem>,
  ) { }
}

@Component({
  selector: 'cs-cost-item-item-view',
  templateUrl: '../template/cost-item/cost-item-item-view.component.html',
  styleUrls: ['../template/cost-item/cost-item.component.less']
})
export class CostItemItemViewComponent {
  private _item: CostItem;

  constructor(
    @Self() private loader: DataLoader<CostItem>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-cost-item-item-form',
  templateUrl: '../template/cost-item/cost-item-item-form.component.html',
  styleUrls: ['../template/cost-item/cost-item.component.less']
})
export class CostItemItemFormComponent {
  private typeRef: CostItemTypeRef[];

  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<CostItem>,
    private formService: CostItemFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  itemCreateForm(item: CostItem){
    const form = this.formService.formCreate(item);

    return form;
  }

  get type$() {
    return Observable.of(this.typeRef);
  }
}
