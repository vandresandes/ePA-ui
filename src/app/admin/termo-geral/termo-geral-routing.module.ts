import { TermoGeralListComponent } from './termo-geral-list/termo-geral-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermoGeralDetailComponent } from './termo-geral-detail/termo-geral-detail.component';

const routes: Routes = [
  { path: 'termogeral', component: TermoGeralDetailComponent,
    data: { title: 'Visualizar Termo Geral' }
  },
  { path: 'termogeral/pesquisa', component: TermoGeralListComponent,
    data: { title: 'Pesquisar Termo Geral' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoGeralRoutingModule { }
