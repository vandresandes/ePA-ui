import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistRoutingModule } from './checklist-routing.module';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ChecklistCadastroComponent } from './checklist-cadastro/checklist-cadastro.component';

@NgModule({
  declarations: [ChecklistListComponent, ChecklistCadastroComponent],
  imports: [
    CommonModule,
    ChecklistRoutingModule
  ]
})
export class ChecklistModule { }
