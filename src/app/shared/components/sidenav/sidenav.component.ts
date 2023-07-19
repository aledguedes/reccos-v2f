import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { menus } from 'src/app/utils/dashboad-menu';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  showFiller: boolean = false;

  nextElementSibling: any;
  config: Config = {};

  constructor() { }

  ngOnInit(): void {
  }

  mergeConfig(options: Config) {
    const config = {
      multi: true
    };

    return { ...config, ...options };
  }

  // toggle(index: number) {
  //   if (!this.config.multi) {
  //     this.menuReccos
  //       .filter((menu: any, i: any) => i !== index && menu.open)
  //       .forEach((menu: any) => (menu.open = !menu.open));
  //   }

  //   this.menuReccos[index].open = !this.menuReccos[index].open;
  // }

}

interface Config {
  multi?: boolean;
};