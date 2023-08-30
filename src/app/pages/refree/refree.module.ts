import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefreeRoutingModule } from './refree-routing.module';
import { RefreeInitComponent } from './refree-init/refree-init.component';
import { RefreeCreateComponent } from './refree-create/refree-create.component';
import { RefreeUpdateComponent } from './refree-update/refree-update.component';
import { RefreeListComponent } from './refree-list/refree-list.component';


@NgModule({
  declarations: [
    RefreeInitComponent,
    RefreeCreateComponent,
    RefreeUpdateComponent,
    RefreeListComponent
  ],
  imports: [
    CommonModule,
    RefreeRoutingModule
  ]
})
export class RefreeModule { }
