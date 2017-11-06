import { Directive } from '@angular/core';
import { MediaMonitor } from '@angular/flex-layout';

@Directive({
  selector: '[activeMedia]',
  exportAs: 'activeMedia'
})
export class ActiveMediaDirective {
  constructor(private _mediaMonitor: MediaMonitor) { }

  is(alias: string){
    return this._mediaMonitor.isActive(alias);
  }

  if(alias: string, isTrue: any, isFalse: any){
    return this.is(alias)? isTrue : isFalse;
  }
}
