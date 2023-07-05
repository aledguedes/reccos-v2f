import { Component, OnInit } from '@angular/core';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  sidenavOpen: boolean = false;
  showFiller: boolean = false;

  constructor(
    private rxjs: DataRxjsService,
  ) {}

  ngOnInit(): void {
    this.rxjs.toggleSidenav$.subscribe(evt => {
      this.sidenavOpen = evt;
    });
  }
  

}
