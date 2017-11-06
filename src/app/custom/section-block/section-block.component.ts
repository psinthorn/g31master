import { Component, Input } from '@angular/core';

@Component({
  selector: 'cs-section-block',
  templateUrl: './section-block.component.html',
  styleUrls: ['./section-block.component.less']
})
export class SectionBlockComponent {
  @Input('header') private _header: string;
  @Input('level') private _level: number = 4;

  constructor() { }

  get header() { return this._header; }
  get level() { return this._level; }
}
