import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InitComponent } from './components/init/init.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';

const routes: Routes = [
  {
    path: '', component: InitComponent, children: [
      {path: '', component: DashAdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
