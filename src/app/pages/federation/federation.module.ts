import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FederationRoutingModule } from './federation-routing.module';
import { FederationListComponent } from './federation-list/federation-list.component';
import { FederationCreateComponent } from './federation-create/federation-create.component';
import { FederationUpdateComponent } from './federation-update/federation-update.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    FederationListComponent,
    FederationCreateComponent,
    FederationUpdateComponent
  ],
  imports: [
    CommonModule,
    FederationRoutingModule,
    MaterialModule
  ]
})
export class FederationModule { }
