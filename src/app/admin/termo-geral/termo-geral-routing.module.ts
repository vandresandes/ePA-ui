import { TermoGeralCadastroComponent } from './termo-geral-cadastro/termo-geral-cadastro.component';
import { TermoGeralListComponent } from './termo-geral-list/termo-geral-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { AuthGuard } from 'src/app/auth';

const routes: Routes = [
  {
    path: 'termogeral',
    canActivate: [AuthGuard],
    children: [
      { path: 'pesquisa', component: TermoGeralListComponent,
        data: { title: 'Pesquisar Termo Geral' }
      },
      { path: 'cadastro', component: TermoGeralCadastroComponent,
        data: { title: 'Cadastrar Termo Geral', acao: EnumCrud.CREATE }
      },
      { path: 'visualizar/:id', component: TermoGeralCadastroComponent,
        data: { title: 'Visualizar Termo Geral', acao: EnumCrud.READ }
      },
      { path: 'editar/:id', component: TermoGeralCadastroComponent,
        data: { title: 'Editar Termo Geral', acao: EnumCrud.UPDATE }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoGeralRoutingModule { }
