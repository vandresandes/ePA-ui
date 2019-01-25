import { TipoProcessoCadastroComponent } from './tipo-processo-cadastro/tipo-processo-cadastro.component';
import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { AuthGuard } from 'src/app/auth';

const routes: Routes = [
  {
    path: 'tipoprocesso',
    canActivate: [AuthGuard],
    children: [
      { path: 'pesquisa', component: TipoProcessoListComponent,
        data: { title: 'Pesquisar Tipo Processo' }
      },
      { path: 'cadastro', component: TipoProcessoCadastroComponent,
        data: { title: 'Cadastrar Tipo Processo', acao: EnumCrud.CREATE }
      },
      { path: 'visualizar/:id', component: TipoProcessoCadastroComponent,
        data: { title: 'Visualizar Tipo Processo', acao: EnumCrud.READ }
      },
      { path: 'editar/:id', component: TipoProcessoCadastroComponent,
        data: { title: 'Editar Tipo Processo', acao: EnumCrud.UPDATE }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoProcessoRoutingModule { }
