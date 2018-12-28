import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NucleoDetailComponent } from './nucleo-detail/nucleo-detail.component';
import { NucleoListComponent } from './nucleo-list/nucleo-list.component';

const routes: Routes = [
  { path: 'nucleo', component: NucleoDetailComponent,
    data: { title: 'Visualizar Núcleo' }
  },
  { path: 'nucleo/pesquisa', component: NucleoListComponent,
    data: { title: 'Pesquisar Núcleo' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NucleoRoutingModule { }
