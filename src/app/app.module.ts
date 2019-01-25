import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { epaUiConf } from './epa-ui.conf';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from 'angular-admin-lte';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

// COMPONENTS
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { IngressoDeProcessosComponent } from './ingresso-de-processos/ingresso-de-processos.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VerificacaoComponent } from './verificacao/verificacao.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InteressadoDialogComponent } from './dialog/interessado-dialog/interessado-dialog.component';

// PRIMENG
import { ButtonModule } from 'primeng/button';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    IngressoDeProcessosComponent,
    VerificacaoComponent,
    InteressadoDialogComponent,
    NavbarComponent
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
    CoreModule,
    BrowserAnimationsModule,
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
    { provide: LOCALE_ID, useValue:'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
