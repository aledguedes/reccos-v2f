import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from 'src/app/models/UserModel';
import { usuarios } from 'src/app/mocks/UsersMock';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'profile', 'name', 'surname', 'email', 'status', 'roles', 'action'];
  dataSource: MatTableDataSource<User>;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.dataSource = new MatTableDataSource(this.users);
  }


  ngOnInit(): void {
    this.listAll();
  }

  routernavigate() {
    this.router.navigate(['create-user']);
  }

  listAll() {
    this.userService.listAllUser().subscribe({
      next: (data: User[]) => {
        console.log('USUÁRIOS SUCESS', data);
        this.users = data;
        this.dataSource = new MatTableDataSource(data);
      },
      error: (err) => {
        console.log('USUÁRIOS ERROR', err);
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

  removerUser(id_user: number) {
    this.userService.removeUser(id_user).subscribe({
      next: (data) => {
        console.log('USUARIO REMOVIDO', data);
        this.listAll();
      },
      error: (err) => {
        console.log('ERRO AO REMOVER USUÁRIO', err);
      }
    });
  }
}

