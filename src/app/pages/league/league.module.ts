import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeagueRoutingModule } from './league-routing.module';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueInitComponent } from './league-init/league-init.component';
import { LeagueCreateComponent } from './league-create/league-create.component';
import { LeagueUpdateComponent } from './league-update/league-update.component';


@NgModule({
  declarations: [
    LeagueListComponent,
    LeagueInitComponent,
    LeagueCreateComponent,
    LeagueUpdateComponent
  ],
  imports: [
    CommonModule,
    LeagueRoutingModule
  ]
})
export class LeagueModule { }
