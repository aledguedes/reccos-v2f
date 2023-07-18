import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children:
    [
      { path: '', component: DashAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
