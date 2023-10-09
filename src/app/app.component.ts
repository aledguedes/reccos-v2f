import { Component, OnInit } from '@angular/core';
import { menus } from './utils/dashboad-menu';
import { DataRxjsService } from './services/data-rxjs.service';
import { FederationService } from './services/federation/federation.service';

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
    private federationService: FederationService
  ) { }
  
  ngOnInit(): void {
    this.rxjs.toggleSidenav$.subscribe(evt => {
      this.sidenavOpen = evt;
    });

    this.federationService.federationById(1).subscribe({
      next: (data) => {
        localStorage.setItem('reccos-federation', JSON.stringify(data));
      },
      error: (err) => {
        console.log('USER BY ID ERR', err);
      }
    });
  }
}
