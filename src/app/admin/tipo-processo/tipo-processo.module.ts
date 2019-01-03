import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProcessoRoutingModule } from './tipo-processo-routing.module';
import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';
import { TipoProcessoCadastroComponent } from './tipo-processo-cadastro/tipo-processo-cadastro.component';

@NgModule({
  declarations: [TipoProcessoListComponent, TipoProcessoCadastroComponent],
  imports: [
    CommonModule,
    TipoProcessoRoutingModule
  ]
})
export class TipoProcessoModule { }
