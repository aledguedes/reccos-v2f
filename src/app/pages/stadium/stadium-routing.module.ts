import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StadiumInitComponent } from './stadium-init/stadium-init.component';
import { StadiumListComponent } from './stadium-list/stadium-list.component';
import { StadiumCreateComponent } from './stadium-create/stadium-create.component';
import { StadiumUpdateComponent } from './stadium-update/stadium-update.component';

const routes: Routes = [
  {
    path: '', component: StadiumInitComponent, children:
    [
      { path: '', component: StadiumListComponent },
      { path: 'create', component: StadiumCreateComponent },
      { path: 'update/:id_stadium', component: StadiumUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StadiumRoutingModule { }
