import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { PersonCorporate } from '../model';

import { PersonCorporateFormService } from '../person-corporate-form.service';

@Component({
  selector: 'cs-person-corporate-item',
  templateUrl: '../template/person-corporate/person-corporate-item.component.html',
  styleUrls: ['../template/person-corporate/person-corporate.component.less']
})
export class PersonCorporateItemComponent {
  constructor(
    @Self() private loader: DataLoader<PersonCorporate>,
  ) { }
}

@Component({
  selector: 'cs-person-corporate-item-view',
  templateUrl: '../template/person-corporate/person-corporate-item-view.component.html',
  styleUrls: ['../template/person-corporate/person-corporate.component.less']
})
export class PersonCorporateItemViewComponent {
  private _item: PersonCorporate;

  constructor(
    @Self() private loader: DataLoader<PersonCorporate>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-person-corporate-item-form',
  templateUrl: '../template/person-corporate/person-corporate-item-form.component.html',
  styleUrls: ['../template/person-corporate/person-corporate.component.less']
})
export class PersonCorporateItemFormComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<PersonCorporate>,
    private formService: PersonCorporateFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  itemCreateForm(item: PersonCorporate){
    const form = this.formService.formCreate(item);

    return form;
  }
}
