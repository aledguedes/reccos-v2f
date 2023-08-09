import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Federation } from 'src/app/models/FederationModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dash-admin',
  templateUrl: './dash-admin.component.html',
  styleUrls: ['./dash-admin.component.scss']
})
export class DashAdminComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  storageUrl = environment.storage_url;

  displayedColumns: string[] = ['id', 'logo', 'name', 'surname', 'owner', 'status'];
  dataSource: MatTableDataSource<Federation>;

  federations: Federation[] = [];

  constructor(
    private federationService: FederationService
  ) {
    this.dataSource = new MatTableDataSource(this.federations);
   }


  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.federationService.listAll().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
        console.log('FEDRATIONS LISTA:', data);
      },
      error: (err) => {
        console.log('FEDRATIONS LISTA ERRO:', err);
      }
    });
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}