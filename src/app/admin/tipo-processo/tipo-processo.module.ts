import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoProcessoRoutingModule } from './tipo-processo-routing.module';
import { TipoProcessoDetailComponent } from './tipo-processo-detail/tipo-processo-detail.component';
import { TipoProcessoListComponent } from './tipo-processo-list/tipo-processo-list.component';

@NgModule({
  declarations: [TipoProcessoDetailComponent, TipoProcessoListComponent],
  imports: [
    CommonModule,
    TipoProcessoRoutingModule
  ]
})
export class TipoProcessoModule { }
