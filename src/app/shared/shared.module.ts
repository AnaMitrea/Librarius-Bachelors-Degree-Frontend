import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { FlexModule } from 'ngx-flexible-layout';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FlexModule,
    MatDividerModule,
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [
    TopBarComponent,
  ],
  exports: [
    TopBarComponent
  ]
})
export class SharedModule { }
