import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProcessoRoutingModule } from './tipo-processo-routing.module';
import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';
import { TipoProcessoCadastroComponent } from './tipo-processo-cadastro/tipo-processo-cadastro.component';

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
  declarations: [TipoProcessoListComponent, TipoProcessoCadastroComponent],
  imports: [
    CommonModule,
    TipoProcessoRoutingModule,
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
export class TipoProcessoModule { }
