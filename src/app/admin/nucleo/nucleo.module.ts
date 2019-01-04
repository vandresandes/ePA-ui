import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NucleoRoutingModule } from './nucleo-routing.module';
import { NucleoListComponent } from './nucleo-list/nucleo-list.component';
import { NucleoCadastroComponent } from './nucleo-cadastro/nucleo-cadastro.component';

// PRIMENG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/components/messages/messages';


@NgModule({
  declarations: [
    NucleoListComponent,
    NucleoCadastroComponent
  ],
  imports: [
    CommonModule,
    NucleoRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule,
    ToastModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    FormsModule
  ]
})
export class NucleoModule { }
