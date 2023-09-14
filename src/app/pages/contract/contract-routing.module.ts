import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractInitComponent } from './contract-init/contract-init.component';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractCreateComponent } from './contract-create/contract-create.component';
import { ContractUpdateComponent } from './contract-update/contract-update.component';

const routes: Routes = [
  {
    path: '', component: ContractInitComponent, children:
    [
      { path: '', component: ContractListComponent },
      { path: 'create', component: ContractCreateComponent },
      { path: 'update/:id_contract', component: ContractUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractRoutingModule { }
