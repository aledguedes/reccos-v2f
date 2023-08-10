import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FederationListComponent } from './federation-list/federation-list.component';
import { FederationCreateComponent } from './federation-create/federation-create.component';
import { FederationInitComponent } from './federation-init/federation-init.component';
import { FederationUpdateComponent } from './federation-update/federation-update.component';

const routes: Routes = [
  {
    path: '', component: FederationInitComponent, children: [
      { path: '', component: FederationListComponent },
      { path: 'create', component: FederationCreateComponent },
      { path: 'update/:id_federation', component: FederationUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FederationRoutingModule { }
