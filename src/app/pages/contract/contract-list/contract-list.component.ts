import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contract } from 'src/app/models/ContractModel';
import { ContractService } from 'src/app/services/contract/contract.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'p_profile', 'p_surname', 't_profile','t_surname', 'dt_start', 'dt_end', 'status', 'action'];
  dataSource: MatTableDataSource<Contract>;

  contracts: Contract[] = [];
  baseUrl = environment.storage_url;

  constructor(
    private contractService: ContractService
  ) {
    this.dataSource = new MatTableDataSource(this.contracts);
  }

  ngOnInit(): void {
    this.listAllContracts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listAllContracts() {
    this.contractService.listAllContract().subscribe({
      next: (data) => {
        this.contracts = data;
        this.dataSource = new MatTableDataSource(data);
        console.log('LIST ALL TEAMS DATA:', data);
      },
      error: (err) => {
        console.log('LIST ALL TEAMS ERR:', err);
      }
    });
  }

  removerContract(id_user: number) {
    this.contractService.removeContract(id_user).subscribe({
      next: (data) => {
        console.log('CONTRACT REMOVIDO', data);
        this.listAllContracts();
      },
      error: (err) => {
        console.log('ERRO AO REMOVER CONTRACT', err);
      }
    });
  }
}
