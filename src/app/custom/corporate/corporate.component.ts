import { Component, Self } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'cs-corporate',
  templateUrl: './corporate.component.html',
  styleUrls: ['./corporate.component.less']
})
export class CustomCorporateComponent{
  constructor(@Self() private controlContainer: ControlContainer) { }

  get formGroup() { return this.controlContainer.control; }
}
