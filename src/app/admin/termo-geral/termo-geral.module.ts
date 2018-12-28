import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermoGeralRoutingModule } from './termo-geral-routing.module';
import { TermoGeralDetailComponent } from './termo-geral-detail/termo-geral-detail.component';
import { TermoGeralListComponent } from './termo-geral-list/termo-geral-list.component';

@NgModule({
  declarations: [TermoGeralDetailComponent, TermoGeralListComponent],
  imports: [
    CommonModule,
    TermoGeralRoutingModule
  ]
})
export class TermoGeralModule { }
