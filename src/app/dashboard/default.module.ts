import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DashAdminComponent } from './components/dash-admin/dash-admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InitComponent } from './components/init/init.component';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    DashAdminComponent,
    DashboardComponent,
    InitComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    MaterialModule
  ]
})
export class DefaultModule { }
