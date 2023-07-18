
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeaderMenu } from 'src/app/models/HeaderMenuModel';
import { FederationCreateComponent } from 'src/app/pages/federation/federation-create/federation-create.component';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { headerMenu } from 'src/app/utils/header-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  crtlOpenAndCloseMenu: boolean = false;
  menus: HeaderMenu[] = headerMenu;

  constructor(
    private rxjs: DataRxjsService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  toggleSidenav() {
    this.crtlOpenAndCloseMenu = !this.crtlOpenAndCloseMenu;
    this.rxjs.openAndCloseMenu(this.crtlOpenAndCloseMenu);
  }

  createFederation() {
    const dialogRef = this.dialog.open(FederationCreateComponent, {
      disableClose: false,
      width: '800px',
      data: {
        animal: 'panda',
      },
    }).afterClosed().subscribe((data: any) => {

    });
  }

  routerHeader() {
    // this.dialog.open(FederationCreateComponent, {
    //   disableClose: false,
    //   width: '700px',
    // });
    this.router.navigate(['federation/create']);
  }
}
