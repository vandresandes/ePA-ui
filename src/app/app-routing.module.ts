import { VerificacaoComponent } from './verificacao/verificacao.component';
import { ChecklistInformacoesRequeridasComponent } from './checklist-informacoes-requeridas/checklist-informacoes-requeridas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ImpressaoResultadoComponent } from './impressao-resultado/impressao-resultado.component';
import { IngressoDeProcessosComponent } from './ingresso-de-processos/ingresso-de-processos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,
    data: { title: 'Login' }
  },
  { path: 'ingresso-processo', component: IngressoDeProcessosComponent,
    data: { title: 'Ingresso de Processo' }
  },
  { path: 'checklist-informacoes-requeridas', component: ChecklistInformacoesRequeridasComponent,
    data: { title: 'Checklist de Informações Requeridas' }
  },
  { path: 'verificacao', component: VerificacaoComponent,
    data: { title: 'Verificação' }
  },
  { path: 'impressao-resultado', component: ImpressaoResultadoComponent,
    data: { title: 'Impressão do Resultado' }
  },
  { path: '', component: IngressoDeProcessosComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
