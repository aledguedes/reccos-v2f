import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefreeRoutingModule } from './refree-routing.module';
import { RefreeInitComponent } from './refree-init/refree-init.component';
import { RefreeCreateComponent } from './refree-create/refree-create.component';
import { RefreeUpdateComponent } from './refree-update/refree-update.component';
import { RefreeListComponent } from './refree-list/refree-list.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    RefreeInitComponent,
    RefreeCreateComponent,
    RefreeUpdateComponent,
    RefreeListComponent
  ],
  imports: [
    CommonModule,
    RefreeRoutingModule,
    MaterialModule
  ]
})
export class RefreeModule { }
