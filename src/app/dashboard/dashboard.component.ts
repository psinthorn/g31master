import { Component, OnInit, HostBinding } from '@angular/core';

//import { fadeInAnimation } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  //animations: [fadeInAnimation]
})
export class DashboardComponent implements OnInit {
  //@HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
