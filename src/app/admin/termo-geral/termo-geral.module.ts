import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoGeralRoutingModule } from './termo-geral-routing.module';
import { TermoGeralListComponent } from './termo-geral-list/termo-geral-list.component';
import { TermoGeralCadastroComponent } from './termo-geral-cadastro/termo-geral-cadastro.component';

// PRIMENG
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [TermoGeralListComponent, TermoGeralCadastroComponent],
  imports: [
    CommonModule,
    TermoGeralRoutingModule,
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    PaginatorModule,
    FormsModule
  ]
})
export class TermoGeralModule { }
