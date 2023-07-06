import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { menus } from 'src/app/utils/dashboad-menu';
import { menuData } from 'src/app/utils/menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  menuReccos = menus;

  sidenavOpen: boolean = false;
  showFiller: boolean = false;

  nextElementSibling: any;

  constructor(
    private rxjs: DataRxjsService,
  ) { }

  ngOnInit(): void {
    this.rxjs.toggleSidenav$.subscribe(evt => {
      this.sidenavOpen = evt;
    });
  }


}
