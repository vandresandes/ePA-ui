import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoProcessoDetailComponent } from './tipo-processo-detail/tipo-processo-detail.component';

const routes: Routes = [
  { path: 'tipoprocesso', component: TipoProcessoDetailComponent,
    data: { title: 'Visualizar Tipo Processo' }
  },
  { path: 'tipoprocesso/pesquisa', component: TipoProcessoListComponent,
    data: { title: 'Pesquisar Tipo Processo' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProcessoRoutingModule { }
