import { Component, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'cs-citizen',
  templateUrl: './citizen.component.html',
  styleUrls: ['./citizen.component.less']
})
export class CitizenComponent {
  constructor(@Self() private controlContainer: ControlContainer) { }

  get formGroup() { return this.controlContainer.control; }
}
