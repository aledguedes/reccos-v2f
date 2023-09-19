import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueInitComponent } from './league-init/league-init.component';
import { LeagueCreateComponent } from './league-create/league-create.component';
import { LeagueUpdateComponent } from './league-update/league-update.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LeagueDetailComponent } from './league-detail/league-detail.component';


@NgModule({
  declarations: [
    LeagueListComponent,
    LeagueInitComponent,
    LeagueCreateComponent,
    LeagueUpdateComponent,
    LeagueDetailComponent
  ],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    MaterialModule
  ]
})
export class LeagueModule { }
