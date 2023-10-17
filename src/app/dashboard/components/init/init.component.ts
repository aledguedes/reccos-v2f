import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { menus } from 'src/app/utils/dashboad-menu';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
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
