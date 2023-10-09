import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginInitComponent } from './login-init/login-init.component';
import { LoginUserComponent } from './login-user/login-user.component';

const routes: Routes = [
  {
    path: '', component: LoginInitComponent, children: [
      { path: '', component: LoginUserComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
