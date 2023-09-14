import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractInitComponent } from './contract-init/contract-init.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractUpdateComponent } from './contract-update/contract-update.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    ContractInitComponent,
    ContractListComponent,
    ContractCreateComponent,
    ContractUpdateComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    MaterialModule
  ]
})
export class ContractModule { }
