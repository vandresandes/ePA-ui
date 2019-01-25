import { EnumCrud } from './../../enums/enum-crud.enum';
import { ChecklistCadastroComponent } from './checklist-cadastro/checklist-cadastro.component';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth';

const routes: Routes = [
  {
    path: 'checklist',
    canActivate: [AuthGuard],
    children: [
      { path: 'pesquisa', component: ChecklistListComponent,
        data: { title: 'Pesquisar Checklist' }
      },
      { path: 'cadastro', component: ChecklistCadastroComponent,
        data: { title: 'Cadastrar Checklist', acao: EnumCrud.CREATE }
      },
      { path: 'visualizar/:id', component: ChecklistCadastroComponent,
        data: { title: 'Visualizar Checklist', acao: EnumCrud.READ }
      },
      { path: 'editar/:id', component: ChecklistCadastroComponent,
        data: { title: 'Editar Checklist', acao: EnumCrud.UPDATE }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
