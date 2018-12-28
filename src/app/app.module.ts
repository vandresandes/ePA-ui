import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { epaUiConf } from './epa-ui.conf';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from 'angular-admin-lte';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// COMPONENTS
import { AppComponent } from './app.component';
import { ChecklistInformacoesRequeridasComponent } from './checklist-informacoes-requeridas/checklist-informacoes-requeridas.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IngressoDeProcessosComponent } from './ingresso-de-processos/ingresso-de-processos.component';
import { ImpressaoResultadoComponent } from './impressao-resultado/impressao-resultado.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VerificacaoComponent } from './verificacao/verificacao.component';

// PRIMENG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';

// MÓDULOS
import { ChecklistModule } from './admin/checklist/checklist.module';
import { DocumentoModule } from './admin/documento/documento.module';
import { NucleoModule } from './admin/nucleo/nucleo.module';
import { TermoEspecificoModule } from './admin/termo-especifico/termo-especifico.module';
import { TermoGeralModule } from './admin/termo-geral/termo-geral.module';
import { TipoProcessoModule } from './admin/tipo-processo/tipo-processo.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ChecklistInformacoesRequeridasComponent,
    PageNotFoundComponent,
    ImpressaoResultadoComponent,
    IngressoDeProcessosComponent,
    VerificacaoComponent
  ],
  imports: [
    BrowserModule,
    ChecklistModule,
    DocumentoModule,
    NucleoModule,
    TermoEspecificoModule,
    TermoGeralModule,
    TipoProcessoModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
    TableModule,
    LayoutModule.forRoot(epaUiConf),
    LoadingPageModule, MaterialBarModule
  ],
  providers: [
    // Locale da aplicação
    { provide: LOCALE_ID, useValue:'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
