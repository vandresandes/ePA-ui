import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistRoutingModule } from './checklist-routing.module';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ChecklistCadastroComponent } from './checklist-cadastro/checklist-cadastro.component';

// PRIMENG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/components/messages/messages';
import { MessageModule } from 'primeng/message';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/components/radiobutton/radiobutton';
import { StatusPipe } from './pipe/status.pipe';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [ChecklistListComponent, ChecklistCadastroComponent, StatusPipe],
  imports: [
    CommonModule,
    ChecklistRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    MessageModule,
    DropdownModule,
    AutoCompleteModule,
    RadioButtonModule,
    PaginatorModule,
    FormsModule
  ]
})
export class ChecklistModule { }
