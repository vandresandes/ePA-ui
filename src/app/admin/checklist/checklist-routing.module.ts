import { ChecklistListComponent } from './checklist-list/checklist-list.component';
import { ChecklistDetailComponent } from './checklist-detail/checklist-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'checklist', component: ChecklistDetailComponent,
    data: { title: 'Visualizar Checklist' }
  },
  { path: 'checklist/pesquisa', component: ChecklistListComponent,
    data: { title: 'Pesquisar Checklist' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChecklistRoutingModule { }
