import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NucleoRoutingModule } from './nucleo-routing.module';
import { NucleoDetailComponent } from './nucleo-detail/nucleo-detail.component';
import { NucleoListComponent } from './nucleo-list/nucleo-list.component';

// PRIMENG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [NucleoDetailComponent, NucleoListComponent],
  imports: [
    CommonModule,
    NucleoRoutingModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    TooltipModule
  ]
})
export class NucleoModule { }
