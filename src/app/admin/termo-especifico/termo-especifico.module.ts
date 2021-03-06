import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoEspecificoRoutingModule } from './termo-especifico-routing.module';
import { TermoEspecificoListComponent } from './termo-especifico-list/termo-especifico-list.component';
import { TermoEspecificoCadastroComponent } from './termo-especifico-cadastro/termo-especifico-cadastro.component';

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
  declarations: [TermoEspecificoListComponent, TermoEspecificoCadastroComponent],
  imports: [
    CommonModule,
    TermoEspecificoRoutingModule,
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
export class TermoEspecificoModule { }
