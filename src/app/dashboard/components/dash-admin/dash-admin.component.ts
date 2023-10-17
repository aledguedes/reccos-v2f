import { Component, OnInit } from '@angular/core';
import { dashAdminMenu } from 'src/app/utils/dash-admin-menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export class DashAdminComponent  implements OnInit {

  dashMenu = dashAdminMenu;
  base_url = environment.storage_url;

  constructor() { }


  ngOnInit(): void {
  }

}
