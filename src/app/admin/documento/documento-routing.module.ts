import { DocumentoCadastroComponent } from './documento-cadastro/documento-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoListComponent } from './documento-list/documento-list.component';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';
import { AuthGuard } from 'src/app/auth';

const routes: Routes = [
  {
    path: 'documento',
    canActivate: [AuthGuard],
    children: [
      { path: 'pesquisa', component: DocumentoListComponent,
        data: { title: 'Pesquisar Documento' }
      },
      { path: 'cadastro', component: DocumentoCadastroComponent,
        data: { title: 'Cadastrar Documento', acao: EnumCrud.CREATE }
      },
      { path: 'visualizar/:id', component: DocumentoCadastroComponent,
        data: { title: 'Visualizar Documento', acao: EnumCrud.READ }
      },
      { path: 'editar/:id', component: DocumentoCadastroComponent,
        data: { title: 'Editar Documento', acao: EnumCrud.UPDATE }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoRoutingModule { }
