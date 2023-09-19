import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueInitComponent } from './league-init/league-init.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { LeagueCreateComponent } from './league-create/league-create.component';
import { LeagueUpdateComponent } from './league-update/league-update.component';
import { LeagueDetailComponent } from './league-detail/league-detail.component';

const routes: Routes = [
  {
    path: '', component: LeagueInitComponent, children: [
      { path: '', component: LeagueListComponent },
      { path: 'create', component: LeagueCreateComponent },
      { path: 'update/:id_league', component: LeagueUpdateComponent },
      { path: 'detail/:id_league', component: LeagueDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
