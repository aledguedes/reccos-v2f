import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserInitComponent } from './user-init/user-init.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {
    path: '', component: UserInitComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'create', component: UserCreateComponent },
      { path: 'update/:id_user', component: UserUpdateComponent },
      { path: 'detail/:id_user', component: UserDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
