import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from 'ngx-flexible-layout';
import { TopBarComponent } from './components';
import { RatingComponent } from './components/rating/rating.component';

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
    RatingComponent,
  ],
  exports: [
    TopBarComponent,
    RatingComponent
  ]
})
export class SharedModule { }
