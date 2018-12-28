import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChecklistRoutingModule } from './checklist-routing.module';
import { ChecklistDetailComponent } from './checklist-detail/checklist-detail.component';
import { ChecklistListComponent } from './checklist-list/checklist-list.component';

@NgModule({
  declarations: [ChecklistDetailComponent, ChecklistListComponent],
  imports: [
    CommonModule,
    ChecklistRoutingModule
  ]
})
export class ChecklistModule { }
