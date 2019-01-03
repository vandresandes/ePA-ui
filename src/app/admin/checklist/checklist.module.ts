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

@NgModule({
  declarations: [ChecklistListComponent, ChecklistCadastroComponent],
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
    FormsModule
  ]
})
export class ChecklistModule { }
