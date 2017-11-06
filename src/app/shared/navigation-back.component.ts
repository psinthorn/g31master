import { Directive, Component, HostListener, Input } from '@angular/core';
import { Location } from '@angular/common';

@Directive({
  selector: '[navigationBack]'
})
export class NavigationBackDirective {
  constructor(private _location: Location) { }

  @HostListener('click', ['$event'])
  onClick(ev) {
    this._location.back();
  }
}

@Component({
  selector: 'navigation-back',
  templateUrl: './navigation-back.component.html'
})
export class NavigationBackComponent {
  private static readonly defaultProperties = {
    icon: 'chevron_left',
    label: 'Back',
    color: null,
    type: null
  };

  private _properties: {[key: string]: any};
  @Input('properties') set properties(value) {
    this._properties = {
      ...NavigationBackComponent.defaultProperties,
      ...value
    };
  };

  constructor() {
    this._properties = {...NavigationBackComponent.defaultProperties};
  }

  get properties() { return this._properties }
}
