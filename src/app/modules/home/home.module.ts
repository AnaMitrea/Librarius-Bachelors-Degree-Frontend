import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    ContainerComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
    ]
})
export class HomeModule { }
