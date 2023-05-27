import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { SharedModule } from "@app-shared/shared.module";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FlexModule } from 'ngx-flexible-layout';
import { MatCardModule } from '@angular/material/card';
import { TrendingSectionComponent } from '@app-modules/home/components/home/components/trending-section/trending-section.component';
import { ReadingFeedComponent } from '@app-modules/home/components/home/components/reading-feed/reading-feed.component';
import { HomeComponent } from './components/home/home.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ChallengesComponent } from '@app-modules/home/components/challenges/components/challenges/challenges.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { TrophiesComponent } from '@app-modules/home/components/challenges/components/trophies/trophies.component';
import { ChallengesContainerComponent } from '@app-modules/home/components/challenges/challenges-container.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatListModule} from "@angular/material/list";
import { BookshelvesExploreComponent } from './components/explore/components/bookshelves-explore/bookshelves-explore.component';
import { CategoriesExploreComponent } from './components/explore/components/categories-explore/categories-explore.component';
import {BooksCarouselComponent} from "@app-shared/components/books-carousel/books-carousel.component";
import {MatTooltipModule} from "@angular/material/tooltip";

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
    ChallengesContainerComponent,
    BookshelvesExploreComponent,
    CategoriesExploreComponent
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
        MatIconModule,
        MatTabsModule,
        MatListModule,
        MatTooltipModule
    ]
})
export class HomeModule { }
