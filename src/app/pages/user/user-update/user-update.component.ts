import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/UserModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit {

  user_data!: User;

  enableUpdateUser: boolean = true;

  id_user: string = '';

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private rxjs: DataRxjsService
  ) { }

  ngOnInit(): void {
    this.id_user = this.activatedRoute.snapshot.params['id_user'];
  }

}
