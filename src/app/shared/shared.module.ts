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
import { BookCategoryPipe } from './pipes/book-category-pipe';

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
    BookCategoryPipe
  ],
  exports: [
    TopBarComponent,
    RatingComponent,
    BookCategoryPipe
  ]
})
export class SharedModule { }
