import { Component, OnInit } from '@angular/core';
import { menus } from './utils/dashboad-menu';
import { DataRxjsService } from './services/data-rxjs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'reccos';
  menuReccos = menus;
  sidenavOpen: boolean = false;

  constructor(
    private rxjs: DataRxjsService,
  ) { }
  
  ngOnInit(): void {
    this.rxjs.toggleSidenav$.subscribe(evt => {
      this.sidenavOpen = evt;
    });
  }
}
