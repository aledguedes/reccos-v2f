import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StadiumRoutingModule } from './stadium-routing.module';
import { StadiumListComponent } from './stadium-list/stadium-list.component';
import { StadiumInitComponent } from './stadium-init/stadium-init.component';
import { StadiumCreateComponent } from './stadium-create/stadium-create.component';
import { StadiumUpdateComponent } from './stadium-update/stadium-update.component';


@NgModule({
  declarations: [
    StadiumListComponent,
    StadiumInitComponent,
    StadiumCreateComponent,
    StadiumUpdateComponent
  ],
  imports: [
    CommonModule,
    StadiumRoutingModule
  ]
})
export class StadiumModule { }
