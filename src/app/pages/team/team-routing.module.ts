import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamInitComponent } from './team-init/team-init.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamCreateComponent } from './team-create/team-create.component';
import { TeamUpdateComponent } from './team-update/team-update.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';

const routes: Routes = [
  {
    path: '', component: TeamInitComponent, children:
    [
      { path: '', component: TeamListComponent },
      { path: 'create', component: TeamCreateComponent },
      { path: 'update/:id_team', component: TeamUpdateComponent },
      { path: 'detail/:id_team', component: TeamDetailComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
