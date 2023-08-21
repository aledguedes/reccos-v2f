import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Federation } from 'src/app/models/FederationModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { dashAdminMenu } from 'src/app/utils/dash-admin-menu';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export class DashAdminComponent implements OnInit {

  dashMenu = dashAdminMenu;

  constructor() { }


  ngOnInit(): void {
  }

}