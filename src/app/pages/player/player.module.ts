import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayerRoutingModule } from './player-routing.module';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerInitComponent } from './player-init/player-init.component';
import { PlayerUpdateComponent } from './player-update/player-update.component';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    PlayerListComponent,
    PlayerInitComponent,
    PlayerUpdateComponent,
    PlayerCreateComponent
  ],
  imports: [
    CommonModule,
    PlayerRoutingModule,
    MaterialModule
  ]
})
export class PlayerModule { }
