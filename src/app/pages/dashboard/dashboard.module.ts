import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';
import { DashUserComponent } from './components/dash-user/dash-user.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DashAdminComponent,
    DashUserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
