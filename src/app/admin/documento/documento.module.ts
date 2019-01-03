import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentoRoutingModule } from './documento-routing.module';
import { DocumentoListComponent } from './documento-list/documento-list.component';
import { DocumentoCadastroComponent } from './documento-cadastro/documento-cadastro.component';

// PRIMENG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/components/messages/messages';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TipoDocumentoPipe } from './pipe/tipo-documento.pipe';

@NgModule({
  declarations: [
    DocumentoListComponent,
    DocumentoCadastroComponent,
    TipoDocumentoPipe
  ],
  imports: [
    CommonModule,
    DocumentoRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    DropdownModule,
    RadioButtonModule,
    FormsModule
  ]
})
export class DocumentoModule { }
