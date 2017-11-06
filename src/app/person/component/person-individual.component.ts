import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { PersonIndividual } from '../model';

import { PersonIndividualFormService } from '../person-individual-form.service';

@Component({
  selector: 'cs-person-individual-item',
  templateUrl: '../template/person-individual/person-individual-item.component.html',
  styleUrls: ['../template/person-individual/person-individual.component.less']
})
export class PersonIndividualItemComponent {
  constructor(
    @Self() private loader: DataLoader<PersonIndividual>,
  ) { }
}

@Component({
  selector: 'cs-person-individual-item-view',
  templateUrl: '../template/person-individual/person-individual-item-view.component.html',
  styleUrls: ['../template/person-individual/person-individual.component.less']
})
export class PersonIndividualItemViewComponent {
  private _item: PersonIndividual;

  constructor(
    @Self() private loader: DataLoader<PersonIndividual>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-person-individual-item-form',
  templateUrl: '../template/person-individual/person-individual-item-form.component.html',
  styleUrls: ['../template/person-individual/person-individual.component.less']
})
export class PersonIndividualItemFormComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<PersonIndividual>,
    private formService: PersonIndividualFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  itemCreateForm(item: PersonIndividual){
    const form = this.formService.formCreate(item);

    return form;
  }
}
