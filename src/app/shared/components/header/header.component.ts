import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  crtlOpenAndCloseMenu: boolean = false;

  constructor(
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  toggleSidenav() {
    this.crtlOpenAndCloseMenu = !this.crtlOpenAndCloseMenu;
    this.rxjs.openAndCloseMenu(this.crtlOpenAndCloseMenu);
  }

}
