import { TermoEspecificoListComponent } from './termo-especifico-list/termo-especifico-list.component';
import { TermoEspecificoDetailComponent } from './termo-especifico-detail/termo-especifico-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'termoespecifico', component: TermoEspecificoDetailComponent,
    data: { title: 'Visualizar Termo Específico' }
  },
  { path: 'termoespecifico/pesquisa', component: TermoEspecificoListComponent,
    data: { title: 'Pesquisar Termo Específico' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoEspecificoRoutingModule { }
