import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from "../../shared/shared.module";
import { BooksCarouselComponent } from './components/books-carousel/books-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexModule } from 'ngx-flexible-layout';
import { MatCardModule } from '@angular/material/card';
import { TrendingSectionComponent } from './components/trending-section/trending-section.component';
import { ReadingFeedComponent } from './components/reading-feed/reading-feed.component';

@NgModule({
  declarations: [
    ContainerComponent,
    BooksCarouselComponent,
    TrendingSectionComponent,
    ReadingFeedComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule,
    FlexModule,
    MatCardModule
  ]
})
export class HomeModule { }
