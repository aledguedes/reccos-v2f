import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RefreeInitComponent } from './refree-init/refree-init.component';
import { RefreeListComponent } from './refree-list/refree-list.component';
import { RefreeCreateComponent } from './refree-create/refree-create.component';
import { RefreeUpdateComponent } from './refree-update/refree-update.component';

const routes: Routes = [
  {
    path: '', component: RefreeInitComponent, children:
    [
      { path: '', component: RefreeListComponent},
      { path: 'create', component: RefreeCreateComponent },
      { path: 'update/:id_refree', component: RefreeUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefreeRoutingModule { }
