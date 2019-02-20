import { JwtInterceptor } from './helpers/jwt-interceptor';
import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { epaUiConf } from './epa-ui.conf';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from 'angular-admin-lte';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InteressadoDialogComponent } from './dialog/interessado-dialog/interessado-dialog.component';
import { IngressoDeProcessosComponent } from './processo/ingresso-de-processos/ingresso-de-processos.component';
import { PesquisaProcessoComponent } from './processo/pesquisa-processo/pesquisa-processo.component';

// PRIMENG
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ListboxModule } from 'primeng/listbox';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { MenubarModule } from 'primeng/menubar';


// MÓDULOS
import { ChecklistModule } from './admin/checklist/checklist.module';
import { DocumentoModule } from './admin/documento/documento.module';
import { NucleoModule } from './admin/nucleo/nucleo.module';
import { TermoEspecificoModule } from './admin/termo-especifico/termo-especifico.module';
import { TermoGeralModule } from './admin/termo-geral/termo-geral.module';
import { TipoProcessoModule } from './admin/tipo-processo/tipo-processo.module';
import { ListaDeProcessosComponent } from './processo/lista-de-processos/lista-de-processos.component';
import { ConfirmarExclusaoComponent } from './dialog/confirmar-exclusao/confirmar-exclusao.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './helpers/basic-auth-interceptor';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { RestrictDirective } from './directive/restrict.directive';
import { InformacoesNoSeiComponent } from './processo/informacoes-no-sei/informacoes-no-sei.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    InteressadoDialogComponent,
    NavbarComponent,
    IngressoDeProcessosComponent,
    PesquisaProcessoComponent,
    ListaDeProcessosComponent,
    ConfirmarExclusaoComponent,
    RestrictDirective,
    InformacoesNoSeiComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RadioButtonModule,
    ChecklistModule,
    DocumentoModule,
    NucleoModule,
    TermoEspecificoModule,
    TermoGeralModule,
    TipoProcessoModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule,
    ButtonModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
    TabViewModule,
    MenubarModule,
    TableModule,
    PaginatorModule,
    FieldsetModule,
    PanelModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    MenuModule,
    FileUploadModule,
    ListboxModule,
    CommonModule,
    FormsModule,
    InputTextareaModule,
    LayoutModule.forRoot(epaUiConf),
    LoadingPageModule, MaterialBarModule
  ],
  providers: [
    // Locale da aplicação
    { provide: LOCALE_ID, useValue:'pt-BR' },
    // { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
