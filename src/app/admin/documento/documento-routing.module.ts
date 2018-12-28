import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocumentoDetailComponent } from './documento-detail/documento-detail.component';
import { DocumentoListComponent } from './documento-list/documento-list.component';

const routes: Routes = [
  { path: 'documento', component: DocumentoDetailComponent,
    data: { title: 'Visualizar Documento' }
  },
  { path: 'documento/pesquisa', component: DocumentoListComponent,
    data: { title: 'Pesquisar Documento' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentoRoutingModule { }
