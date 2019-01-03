import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentoRoutingModule } from './documento-routing.module';
import { DocumentoListComponent } from './documento-list/documento-list.component';
import { DocumentoCadastroComponent } from './documento-cadastro/documento-cadastro.component';

@NgModule({
  declarations: [DocumentoListComponent, DocumentoCadastroComponent],
  imports: [
    CommonModule,
    DocumentoRoutingModule
  ]
})
export class DocumentoModule { }
