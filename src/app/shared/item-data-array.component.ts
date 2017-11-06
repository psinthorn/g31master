import { Component, Input, Self } from '@angular/core';
import { FormArray, ControlContainer } from '@angular/forms';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'item-data-array',
  templateUrl: './item-data-array.component.html',
  styleUrls: [ './item-data-array.component.less' ]
})
export class ItemDataArrayComponent {
  @Input('createItemCallback') private _createItemCallback: Function;
  private _required: boolean;
  @Input() set required(value: boolean){this._required = ((value as any === '') || !!value);};

  constructor(@Self() private controlContainer: ControlContainer) {
    this._required = false;
  }

  get formArray() {return this.controlContainer.control as FormArray;}
  get required() {return this._required;}

  addItem(){
    if(this.formArray === null) return;

    this.formArray.push(this._createItemCallback());
  }

  removeItem(index: number){
    if(this.formArray === null) return;

    this.formArray.removeAt(index);
  }
}

const animateEaseOut = animate('250ms ease-out');
const transitionRowColumn = transition('row => column', animateEaseOut);
const transitionColumnRow = transition('column => row', animateEaseOut);
const actionBarHeight4Column = '40px';
const actionBarHeight4Row = '56px';

@Component({
  selector: 'item-data-array-item',
  templateUrl: './item-data-array-item.component.html',
  styleUrls: [ './item-data-array.component.less' ],
  animations: [
    trigger('actionBarContainerState', [
      state('column', style({
        height: actionBarHeight4Column
      })),
      state('row', style({
        height: '0px'
      })),
      transitionRowColumn,
      transitionColumnRow,
    ]),
    trigger('actionBarState', [
      state('column', style({
        height: actionBarHeight4Column,
        backgroundColor: 'silver'
      })),
      state('row', style({
        height: actionBarHeight4Row
      })),
      transitionRowColumn,
      transitionColumnRow,
    ]),
    trigger('contentState', [
      state('column', style({
      })),
      state('row', style({
        marginLeft: '36px',
        marginRight: '36px'
      })),
      transitionRowColumn,
      transitionColumnRow,
    ]),
  ]
})
export class ItemDataArrayItemComponent {
  @Input('index') private _index: number;
  @Input('layout') layout: string;
  private _divider: boolean;
  @Input('divider') set required(value: boolean){ this._divider = ((value as any === '') || !!value); };
  private _unremovable: boolean;
  @Input('unremovable') set unremovable(value: boolean){ this._unremovable = ((value as any === '') || !!value); };

  constructor(
    private _itemDataArray: ItemDataArrayComponent
  ) {
    this.layout = 'row';
    this._divider = false;
    this._unremovable = false;
  }

  get divider() {return this._divider;}
  get index() { return this._index; }
  get itemDataArray() {return this._itemDataArray;}
  get unremovable() {return (this._unremovable || (this.itemDataArray.required && (this.itemDataArray.formArray.length <= 1)));}
}
