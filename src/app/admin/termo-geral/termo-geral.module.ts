import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoGeralRoutingModule } from './termo-geral-routing.module';
import { TermoGeralListComponent } from './termo-geral-list/termo-geral-list.component';
import { TermoGeralCadastroComponent } from './termo-geral-cadastro/termo-geral-cadastro.component';

@NgModule({
  declarations: [TermoGeralListComponent, TermoGeralCadastroComponent],
  imports: [
    CommonModule,
    TermoGeralRoutingModule
  ]
})
export class TermoGeralModule { }
