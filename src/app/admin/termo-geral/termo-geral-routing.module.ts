import { TermoGeralCadastroComponent } from './termo-geral-cadastro/termo-geral-cadastro.component';
import { TermoGeralListComponent } from './termo-geral-list/termo-geral-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

const routes: Routes = [
  { path: 'termogeral/pesquisa', component: TermoGeralListComponent,
    data: { title: 'Pesquisar Termo Geral' }
  },
  { path: 'termogeral/cadastro', component: TermoGeralCadastroComponent,
    data: { title: 'Cadastrar Termo Geral', acao: EnumCrud.CREATE }
  },
  { path: 'termogeral/visualizar/:id', component: TermoGeralCadastroComponent,
    data: { title: 'Visualizar Termo Geral', acao: EnumCrud.READ }
  },
  { path: 'termogeral/editar/:id', component: TermoGeralCadastroComponent,
    data: { title: 'Editar Termo Geral', acao: EnumCrud.UPDATE }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoGeralRoutingModule { }
