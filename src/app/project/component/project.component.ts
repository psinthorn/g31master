import { Component, forwardRef, Self } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import { ProjectFormService } from '../project-form.service';
import { Project } from '../model';

import { csProjectItemLoaderProvider } from '../provider';

@Component({
  selector: 'cs-project-list',
  templateUrl: '../template/project/project-list.component.html',
  styleUrls: ['../template/project/project.component.less'],
})
export class ProjectListComponent {
  private _items: Project[];

  constructor(
    @Self() private loader: DataLoader<Project[]>,
  ) {
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}

@Component({
  selector: 'cs-project-item',
  templateUrl: '../template/project/project-item.component.html',
  styleUrls: ['../template/project/project.component.less'],
  providers: [csProjectItemLoaderProvider],
})
export class ProjectItemComponent {
  constructor(
    @Self() private loader: DataLoader<Project>,
  ) { }
}

@Component({
  selector: 'cs-project-item-view',
  templateUrl: '../template/project/project-item-view.component.html',
  styleUrls: ['../template/project/project.component.less'],
})
export class ProjectItemViewComponent {
  private _item: Project;

  constructor(
    @Self() private loader: DataLoader<Project>,
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });
  }

  get item() { return this._item; }
}

@Component({
  selector: 'cs-project-item-edit',
  templateUrl: '../template/project/project-item-edit.component.html',
  styleUrls: ['../template/project/project.component.less']
})
export class ProjectItemEditComponent {
  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<Project>,
    private formService: ProjectFormService,
  ) {
    this.form = null;

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  itemCreateForm(item: Project){
    const form = this.formService.formCreate(item);

    return form;
  }

  get allowedBankAccounts() {
    return (this.form.value.owner)? this.form.value.owner.bankAccounts : [];
  }

  compareWith(obj1, obj2) {
    if(obj1.id && obj2.id) return obj1.id === obj2.id;
    return obj1.toString() === obj2.toString();
  }
}
