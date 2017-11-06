import { Component, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { Person } from '../model';

@Component({
  selector: 'cs-person-list',
  templateUrl: '../template/person/person-list.component.html',
  styleUrls: ['../template/person/person.component.less'],
})
export class PersonListComponent {
  private _items: Person[];

  constructor(
    @Self() private loader: DataLoader<Person[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}
