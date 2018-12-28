import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentoRoutingModule } from './documento-routing.module';
import { DocumentoDetailComponent } from './documento-detail/documento-detail.component';
import { DocumentoListComponent } from './documento-list/documento-list.component';

@NgModule({
  declarations: [DocumentoDetailComponent, DocumentoListComponent],
  imports: [
    CommonModule,
    DocumentoRoutingModule
  ]
})
export class DocumentoModule { }
