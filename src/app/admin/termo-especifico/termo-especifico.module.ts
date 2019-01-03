import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoEspecificoRoutingModule } from './termo-especifico-routing.module';
import { TermoEspecificoListComponent } from './termo-especifico-list/termo-especifico-list.component';
import { TermoEspecificoCadastroComponent } from './termo-especifico-cadastro/termo-especifico-cadastro.component';

@NgModule({
  declarations: [TermoEspecificoListComponent, TermoEspecificoCadastroComponent],
  imports: [
    CommonModule,
    TermoEspecificoRoutingModule
  ]
})
export class TermoEspecificoModule { }
