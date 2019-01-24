import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IngressoDeProcessosComponent } from './ingresso-de-processos/ingresso-de-processos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,
    data: { title: '' }
  },
  { path: 'ingressoprocesso', component: IngressoDeProcessosComponent,
    data: { title: 'Ingresso de Processo' }
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
