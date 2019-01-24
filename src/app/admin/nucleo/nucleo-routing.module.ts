import { NucleoCadastroComponent } from './nucleo-cadastro/nucleo-cadastro.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NucleoListComponent } from './nucleo-list/nucleo-list.component';
import { EnumCrud } from 'src/app/enums/enum-crud.enum';

const routes: Routes = [
  { path: 'nucleo/pesquisa', component: NucleoListComponent,
    data: { title: 'Pesquisar Núcleo' }
  },
  /*
  { path: 'nucleo/cadastro', component: NucleoCadastroComponent,
    data: { title: 'Cadastrar Núcleo', acao: EnumCrud.CREATE }
  },
  */
  { path: 'nucleo/visualizar/:id', component: NucleoCadastroComponent,
    data: { title: 'Visualizar Núcleo', acao: EnumCrud.READ }
  },
  { path: 'nucleo/editar/:id', component: NucleoCadastroComponent,
    data: { title: 'Editar Núcleo', acao: EnumCrud.UPDATE }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NucleoRoutingModule { }
