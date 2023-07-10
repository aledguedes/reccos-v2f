import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FederationListComponent } from './federation-list/federation-list.component';
import { FederationCreateComponent } from './federation-create/federation-create.component';

const routes: Routes = [
  {
    path: '', component: FederationListComponent, children: [
      { path: 'create', component: FederationCreateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FederationRoutingModule { }
