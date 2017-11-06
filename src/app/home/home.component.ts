import { Component, Directive, Self } from '@angular/core';
import { MediaMonitor } from '@angular/flex-layout';
import { FormGroup } from '@angular/forms';

import { DataLoader } from '@i3e/data-loader';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { ItemDeleteConfirmComponent } from '@consol/shared';

/*
import {
  ComponentInfoService,
  ItemRootBase,
  ItemListBase,
  ItemIndividualBase, ItemViewBase, ItemEditBase,
  ItemOnReadyMethod,
  ItemDeleteConfirmMethod
} from '@consol/shared';
*/

import { HomeFormService } from './home-form.service';
import { HomeService } from './home.service';
import { Home, HomeDetail } from './model';

// RxJS import
import 'rxjs/add/operator/filter';

// For test
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Component({
  selector: 'home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeListComponent {
  private _items: Home[];

  constructor(
    @Self() private loader: DataLoader<Home[]>,
  ) {
console.debug('home-list:', this.loader);
    this.loader.data$.subscribe((data) => {
      this._items = data;
    });
  }

  get items() { return this._items; }
}

@Component({
  selector: 'home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeItemComponent {
  constructor(
    //injector: Injector,
    ds: HomeService,
  ){
    //super(injector, ds);
  }
}

const animateEaseOut = animate('250ms ease-out');
const transitionRowColumn = transition('row => column', animateEaseOut);
const transitionColumnRow = transition('column => row', animateEaseOut);

@Component({
  selector: 'home-item-view',
  templateUrl: './home-item-view.component.html',
  styleUrls: ['./home.component.less'],
  animations: [
    trigger('actionBarContainerState', [
      state('column', style({
      })),
      state('row', style({
        height: '0px'
      })),
      transitionRowColumn,
      transitionColumnRow,
    ]),
    trigger('actionBarState', [
      state('column', style({
        backgroundColor: 'silver'
      })),
      state('row', style({
      })),
      transitionRowColumn,
      transitionColumnRow,
    ]),
    trigger('contentState', [
      state('column', style({
      })),
      state('row', style({
        marginLeft: '32px',
        marginRight: '32px'
      })),
      transitionRowColumn,
      transitionColumnRow,
    ]),
  ]
})
export class HomeItemViewComponent {
  private _layoutState: string;

  private _testControl: FormControl;

  private _item: Home;

  constructor(
    @Self() private loader: DataLoader<Home>,
    public ds: HomeService,
    private _mediaMonitor: MediaMonitor
  ) {
    this._item = null;
    this.loader.data$.subscribe((data) => {
      this._item = data;
    });

    this._testControl = new FormControl(null, <any>Validators.required)
  }

  get item() { return this._item; }

  get testControl() { return this._testControl; }
  get layoutState() { return this._layoutState; }

  private options: User[] = [
    new User('101', 'aaa'),
    new User('102', 'abb'),
    new User('103', 'abc'),
  ];

  public trigger: FormControl = new FormControl({ value: this.options[0] });
  public filteredOptions: Observable<User[]>;

  ngOnInit(){
    //super.ngOnInit();
    this._setLayoutState_column(this._mediaMonitor.isActive('xs'));
    this._mediaMonitor.observe('xs')
      .subscribe((mediaChange) => this._setLayoutState_column(mediaChange.matches))
    ;

    this.filteredOptions = this.trigger.valueChanges
      .startWith(null)
      .map(user => user && (typeof user === 'object')? user.name : user)
      .map(name => name ? this.filter(name) : this.options.slice())
    ;

    setTimeout(() => this.trigger.setValue(this.options[2]), 5000);
  }

  filter(name: string): User[] {
    return this.options.filter(option => new RegExp(`^${name}`, 'gi').test(option.name));
  }

  displayFn(user: string|User): string {
console.debug('display of:', user);
    return (user instanceof User)? user.name : user;
  }

  private _setLayoutState_column(isColumn: boolean){
    this._layoutState = (isColumn)? 'column' : 'row';
  }
}

class User {
  constructor(public code: string, public name: string) { }
}

@Component({
  selector: 'home-item-edit',
  templateUrl: './home-item-edit.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeItemEditComponent {

  private _createDetail: Function;

  public form: FormGroup;

  constructor(
    @Self() private loader: DataLoader<Home>,
    private homeFormService: HomeFormService,
  ) {
    this._createDetail = this.itemCreateDetailForm.bind(this);

    this.loader.data$.subscribe((data) => {
      this.form = this.itemCreateForm(data);
    });
  }

  get createDetail() {return this._createDetail;}

  itemCreateForm(item){
    return this.homeFormService.formCreate(item);
  }

  itemCreateDetailForm(detail?: HomeDetail) {
    return this.homeFormService.itemCreateDetailForm(detail);
  }
}

@Directive({
  selector: '[myTest]',
  exportAs: 'myTest'
})
export class MyTestDirective {
  xxx: string = 'abcd';

  constructor() {
console.debug('myTest created');
  }
}
