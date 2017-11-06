import { Component, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'cs-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less']
})
export class AddressComponent {
  constructor(@Self() private controlContainer: ControlContainer) { }

  get formGroup() { return this.controlContainer.control; }
}
