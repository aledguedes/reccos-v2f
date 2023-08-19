import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeagueInitComponent } from './league-init/league-init.component';
import { LeagueListComponent } from './league-list/league-list.component';

const routes: Routes = [
  {
    path: '', component: LeagueInitComponent, children: [
      { path: '', component: LeagueListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeagueRoutingModule { }
