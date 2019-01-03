import { EnumCrud } from './../../enums/enum-crud.enum';
import { ChecklistCadastroComponent } from './checklist-cadastro/checklist-cadastro.component';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'checklist/pesquisa', component: ChecklistListComponent,
    data: { title: 'Pesquisar Checklist' }
  },
  { path: 'checklist/cadastro', component: ChecklistCadastroComponent,
    data: { title: 'Cadastrar Checklist', acao: EnumCrud.CREATE }
  },
  { path: 'checklist/visualizar/:id', component: ChecklistCadastroComponent,
    data: { title: 'Visualizar Checklist', acao: EnumCrud.READ }
  },
  { path: 'checklist/editar/:id', component: ChecklistCadastroComponent,
    data: { title: 'Editar Checklist', acao: EnumCrud.UPDATE }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
