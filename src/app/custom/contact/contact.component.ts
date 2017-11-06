import { Component, Self } from '@angular/core';
import { ControlContainer, FormArray } from '@angular/forms';

import { ContactFormService } from './contact-form.service';

@Component({
  selector: 'cs-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent{
  constructor(@Self() private controlContainer: ControlContainer) { }

  get formGroup() { return this.controlContainer.control; }
}

@Component({
  selector: 'cs-contact-array',
  templateUrl: './contact-array.component.html',
  styleUrls: ['./contact-array.component.less']
})
export class ContactArrayComponent{
  constructor(
    private contactFormService: ContactFormService,
    @Self() private controlContainer: ControlContainer,
  ) { }

  createItem() { return this.contactFormService.formCreate(); }
  get formArray() { return this.controlContainer.control as FormArray; }
}
