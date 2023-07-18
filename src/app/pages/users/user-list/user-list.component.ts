import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from 'src/app/models/UserModel';
import { usuarios } from 'src/app/mocks/UsersMock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = usuarios;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'email', 'status', 'roles', 'action'];
  dataSource: MatTableDataSource<User>;

  constructor(
    private router: Router
  ) { 
    this.dataSource = new MatTableDataSource(this.users);
  }

  
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    console.log('usuários:', usuarios);
  }

  routernavigate() {
    this.router.navigate(['create-user']);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
