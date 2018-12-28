import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NucleoRoutingModule } from './nucleo-routing.module';
import { NucleoDetailComponent } from './nucleo-detail/nucleo-detail.component';
import { NucleoListComponent } from './nucleo-list/nucleo-list.component';

@NgModule({
  declarations: [NucleoDetailComponent, NucleoListComponent],
  imports: [
    CommonModule,
    NucleoRoutingModule
  ]
})
export class NucleoModule { }
