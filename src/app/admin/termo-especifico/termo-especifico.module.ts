import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoEspecificoRoutingModule } from './termo-especifico-routing.module';
import { TermoEspecificoDetailComponent } from './termo-especifico-detail/termo-especifico-detail.component';
import { TermoEspecificoListComponent } from './termo-especifico-list/termo-especifico-list.component';

@NgModule({
  declarations: [TermoEspecificoDetailComponent, TermoEspecificoListComponent],
  imports: [
    CommonModule,
    TermoEspecificoRoutingModule
  ]
})
export class TermoEspecificoModule { }
