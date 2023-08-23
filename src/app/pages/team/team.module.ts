import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamUpdateComponent } from './team-update/team-update.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamInitComponent } from './team-init/team-init.component';


@NgModule({
  declarations: [
    TeamCreateComponent,
    TeamUpdateComponent,
    TeamListComponent,
    TeamInitComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule
  ]
})
export class TeamModule { }
