import { TermoEspecificoCadastroComponent } from './termo-especifico-cadastro/termo-especifico-cadastro.component';
import { TermoEspecificoListComponent } from './termo-especifico-list/termo-especifico-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { AuthGuard } from 'src/app/auth';

const routes: Routes = [
  {
    path: 'termoespecifico',
    canActivate: [AuthGuard],
    children: [
      { path: 'pesquisa', component: TermoEspecificoListComponent,
        data: { title: 'Pesquisar Termo Específico' }
      },
      { path: 'cadastro', component: TermoEspecificoCadastroComponent,
        data: { title: 'Cadastrar Termo Específico', acao: EnumCrud.CREATE }
      },
      { path: 'visualizar/:id', component: TermoEspecificoCadastroComponent,
        data: { title: 'Visualizar Termo Específico', acao: EnumCrud.READ }
      },
      { path: 'editar/:id', component: TermoEspecificoCadastroComponent,
        data: { title: 'Editar Termo Específico', acao: EnumCrud.UPDATE }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermoEspecificoRoutingModule { }
