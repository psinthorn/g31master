import {
  Component, ViewEncapsulation,
  OnInit, ViewChild,
  ElementRef
} from '@angular/core';

import { Route, Routes, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

/* RxJS operators */
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { GlobalState, GlobalStateService } from '@i3e/global-state';

import { MediaMonitor } from '@angular/flex-layout';

import { appRoutes } from './app-routing.module';

import { Http } from '@angular/http';

import { ServerResolverService } from './shared';

import {
  trigger,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

const DEFAULT_COMPONENTINFO = {
  label: 'Module'
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    trigger('changeState', [
      transition(':enter', [   // :enter is alias to 'void => *'
        animate(250, keyframes([
          style({opacity: 0, transform: 'translateX(-100%)', offset: 0}),
          style({opacity: 1, transform: 'translateX(15px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateX(0)',     offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  public title = 'app works!';
  public routes: Routes = appRoutes;
  public routeData: any = DEFAULT_COMPONENTINFO;
  public componentInfo: GlobalState;

  @ViewChild('sideMenu') private _sideMenu : MatSidenav;

  private _small: boolean = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _mediaMonitor: MediaMonitor,
    componentInfoService: GlobalStateService
  ) {
    this.componentInfo = componentInfoService.globalState;
  }

  get small() {
    return this._small;
  }

  get header() {
    let message: any = null;
    if(this.componentInfo){
      message = this.componentInfo.error || this.componentInfo.label
    }

    return message || this.routeData.label;
  }

  ngOnInit(){
    let routerChangeHandler = this._router.events
      .filter(event => event instanceof NavigationEnd);

    routerChangeHandler
      .map(() => this._route)
      .map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe((data) => {
        this.routeData = data;
      })
    ;

    this._mediaMonitor.observe('xs').subscribe((mediaChain)=>{
      this._small = mediaChain.matches;
    });

    this._mediaMonitor.observe('gt-md').subscribe((mediaChain)=>{
      if(mediaChain.matches){
        if(this._sideMenu.mode !== 'side'){
          this._sideMenu.align = 'start';
          this._sideMenu.open();
        }
        this._sideMenu.mode = 'side';
      } else{
        if(this._sideMenu.mode !== 'over'){
          this._sideMenu.align = 'start';
          this._sideMenu.close();
        }
        this._sideMenu.mode = 'over';
      }
    });
  }

  getMenuLabel(route: Route){
    return (route.data)? route.data.label || route.path : route.path;
  }

  tryCloseSideMenu(){
    if(this._sideMenu.mode !== 'side') this._sideMenu.close();
  }

/*
  onRouterActivate(comp){
    if(this.componentInfo$$ !== null) this.componentInfo$$.unsubscribe();
    this.componentInfo$$ = null;
    if(comp.componentInfo$ instanceof Observable){
      this.componentInfo$$ = comp.componentInfo$
        //.delay(1000)
        .subscribe((componentInfo: ComponentInfo) => {
console.debug('setting componentInfo:', componentInfo);
        this.componentInfo = componentInfo;
      });
    } else{
      this.componentInfo = {enableSearchTerm: false};
    }
  }
*/
}
