import { ListaDeProcessosComponent } from './processo/lista-de-processos/lista-de-processos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IngressoDeProcessosComponent } from './processo/ingresso-de-processos/ingresso-de-processos.component';
import { PesquisaProcessoComponent } from './processo/pesquisa-processo/pesquisa-processo.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,
    data: { title: '' }
  },
  { path: 'listadeprocesso', component: ListaDeProcessosComponent,
    data: { title: 'Lista de Processos' }
  },
  { path: 'listadeprocesso/:numeroProcesso', component: ListaDeProcessosComponent,
    data: { title: 'Lista de Processos' }
  },
  { path: 'ingressoprocesso', component: IngressoDeProcessosComponent,
    data: { title: 'Ingresso de Processo' }
  },
  { path: 'ingressoprocesso/:id', component: IngressoDeProcessosComponent,
    data: { title: 'Ingresso de Processo' }
  },
  { path: 'pesquisaprocesso', component: PesquisaProcessoComponent,
    data: { title: 'Acompanhar Processos' }
  },
  { path: '', component: LoginComponent,
    data: { title: '' }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
