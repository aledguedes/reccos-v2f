import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerInitComponent } from './player-init/player-init.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';

const routes: Routes = [
  {
    path: '', component: PlayerInitComponent, children:
    [
      { path: '', component: PlayerListComponent },
      { path: 'create', component: PlayerCreateComponent },
      { path: 'update/:id_player', component: PlayerUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayerRoutingModule { }
