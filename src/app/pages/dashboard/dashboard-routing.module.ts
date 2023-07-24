import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';
import { DashUserComponent } from './components/dash-user/dash-user.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children:
      [
        // { path: '', component: DashAdminComponent },
        { path: '', component: DashUserComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
