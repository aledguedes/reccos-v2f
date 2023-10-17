import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Federation } from 'src/app/models/FederationModel';
import { FederationService } from 'src/app/services/federation/federation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-federation-list',
  templateUrl: './federation-list.component.html',
  styleUrls: ['./federation-list.component.scss']
})
export class FederationListComponent implements OnInit {

  federation: Federation[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'profile', 'name', 'surname', 'status', 'responsable', 'action'];
  dataSource: MatTableDataSource<Federation>;

  baseUrl = environment.storage_url;

  constructor(
    private federationService: FederationService
  ) {
    this.dataSource = new MatTableDataSource(this.federation);
  }


  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.federationService.listAllFederation().subscribe({
      next: (data: Federation[]) => {
        console.log('FEDERAÇÕES LIST SUCESS', data);
        this.federation = data;
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log('FEDERAÇÕES ERROR', err);
      }
    });
  }

  removeFederation(id_federation: number) {
    this.federationService.removeFederation(id_federation).subscribe({
      next: (data) => {
        console.log('USUARIO REMOVIDO', data);
        this.listAll();
      },
      error: (err) => {
        console.log('ERRO AO REMOVER USUÁRIO', err);
      }
    });
  }

  saveLocalStorage(data: Federation) {
    localStorage.removeItem('reccos-federation');
    localStorage.setItem('reccos-federation', JSON.stringify(data));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
