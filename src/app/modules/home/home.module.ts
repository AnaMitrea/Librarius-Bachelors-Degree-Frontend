import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from "@app-shared/shared.module";
import { BooksCarouselComponent } from '@app-modules/home/components/home/components/books-carousel/books-carousel.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexModule } from 'ngx-flexible-layout';
import { MatCardModule } from '@angular/material/card';
import { TrendingSectionComponent } from '@app-modules/home/components/home/components/trending-section/trending-section.component';
import { ReadingFeedComponent } from '@app-modules/home/components/home/components/reading-feed/reading-feed.component';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ChallengesComponent } from '@app-modules/home/components/challenges-container/components/challenges/challenges.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TrophiesComponent } from '@app-modules/home/components/challenges-container/components/trophies/trophies.component';
import { ChallengesContainerComponent } from './components/challenges-container/challenges-container.component';

@NgModule({
  declarations: [
    ContainerComponent,
    BooksCarouselComponent,
    TrendingSectionComponent,
    ReadingFeedComponent,
    HomeComponent,
    ExploreComponent,
    ChallengesComponent,
    TrophiesComponent,
    ChallengesContainerComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        CarouselModule,
        FlexModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class HomeModule { }
