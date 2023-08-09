import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Federation } from 'src/app/models/FederationModel';
import { FederationService } from 'src/app/services/federation/federation.service';

@Component({
  selector: 'app-federation-list',
  templateUrl: './federation-list.component.html',
  styleUrls: ['./federation-list.component.scss']
})
export class FederationListComponent implements OnInit {

  federation: Federation[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'profile', 'name', 'status', 'responsable', 'action'];
  dataSource: MatTableDataSource<Federation>;

  constructor(
    private federationService: FederationService
  ) {
    this.dataSource = new MatTableDataSource(this.federation);
  }


  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.federationService.listAll().subscribe({
      next: (data: Federation[]) => {
        console.log('USUÁRIOS SUCESS', data);
        this.federation = data;
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log('USUÁRIOS ERROR', err);
      }
    });
  }

  removerUser(id_user: number) {
    this.federationService.removeFederation(id_user).subscribe({
      next: (data) => {
        console.log('USUARIO REMOVIDO', data);
        this.listAll();
      },
      error: (err) => {
        console.log('ERRO AO REMOVER USUÁRIO', err);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
