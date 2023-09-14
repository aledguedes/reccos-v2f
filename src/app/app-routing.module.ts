import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule)
  },
  {
    path:'federation',
    loadChildren: () => import('./pages/federation/federation.module').then(m => m.FederationModule)
  },
  {
    path: 'league',
    loadChildren: () => import('./pages/league/league.module').then(m => m.LeagueModule)
  },
  {
    path: 'team',
    loadChildren: () => import('./pages/team/team.module').then(m => m.TeamModule)
  },
  {
    path: 'stadium',
    loadChildren: () => import('./pages/stadium/stadium.module').then(m => m.StadiumModule)
  },
  {
    path: 'refree',
    loadChildren: () => import('./pages/refree/refree.module').then(m => m.RefreeModule)
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.module').then(m => m.PlayerModule)
  },
  {
    path: 'contract',
    loadChildren: () => import('./pages/contract/contract.module').then(m => m.ContractModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
