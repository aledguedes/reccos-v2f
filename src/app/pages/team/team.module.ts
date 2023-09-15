import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamUpdateComponent } from './team-update/team-update.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamInitComponent } from './team-init/team-init.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TeamDetailComponent } from './team-detail/team-detail.component';


@NgModule({
  declarations: [
    TeamCreateComponent,
    TeamUpdateComponent,
    TeamListComponent,
    TeamInitComponent,
    TeamDetailComponent
  ],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MaterialModule
  ]
})
export class TeamModule { }
