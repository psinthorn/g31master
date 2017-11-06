import { Component, Self, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormArray, FormGroup } from '@angular/forms';

import { ContactPhoneFormService } from './contact-phone-form.service';

@Component({
  selector: 'cs-contact-phone',
  templateUrl: './contact-phone.component.html',
  styleUrls: ['./contact-phone.component.less']
})
export class ContactPhoneComponent{
  @Output('defaultChange') private _defaultChangeEmitter: EventEmitter<void>;

  constructor(@Self() private controlContainer: ControlContainer) {
    this._defaultChangeEmitter = new EventEmitter<void>();
  }

  get formGroup() { return this.controlContainer.control; }

  setDefault(){
    this._defaultChangeEmitter.emit();
  }
}

@Component({
  selector: 'cs-contact-phone-array',
  templateUrl: './contact-phone-array.component.html',
  styleUrls: ['./contact-phone-array.component.less']
})
export class ContactPhoneArrayComponent{
  private _createItem: () => FormGroup;

  constructor(
    private contactPhoneFormService: ContactPhoneFormService,
    @Self() private controlContainer: ControlContainer,
  ) {
    this._createItem = () => this.contactPhoneFormService.formCreate();
  }

  get createItem() { return this._createItem; }
  get formArray() { return this.controlContainer.control as FormArray; }

  setDefault(index: number){
    let controls = this.formArray.controls;
    controls.forEach((control, i) => control.get('default').setValue(i == index));
  }
}
