import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { HomeComponent } from "@app-modules/home/components/home/home.component";
import { ExploreComponent } from "@app-modules/home/components/explore/explore.component";
import { ChallengesComponent } from "@app-modules/home/components/challenges/components/challenges/challenges.component";
import { TrophiesComponent } from "@app-modules/home/components/challenges/components/trophies/trophies.component";
import {ChallengesContainerComponent} from "@app-modules/home/components/challenges/challenges-container.component";
import {BookshelvesExploreComponent} from "@app-modules/home/components/explore/components/bookshelves-explore/bookshelves-explore.component";
import {CategoriesExploreComponent} from "@app-modules/home/components/explore/components/categories-explore/categories-explore.component";
import {LeaderboardContainerComponent} from "@app-modules/home/components/leaderboard/leaderboard-container.component";
import {
  GlobalLeaderboardComponent
} from "@app-modules/home/components/leaderboard/components/global-leaderboard/global-leaderboard.component";
import {
  FriendsLeaderboardComponent
} from "@app-modules/home/components/leaderboard/components/friends-leaderboard/friends-leaderboard.component";
import {
  BooksGlobalLeaderboardComponent
} from "@app-modules/home/components/leaderboard/components/global-leaderboard/components/books-global-leaderboard/books-global-leaderboard.component";
import {
  PointsGlobalLeaderboardComponent
} from "@app-modules/home/components/leaderboard/components/global-leaderboard/components/points-global-leaderboard/points-global-leaderboard.component";
import {
  MinutesGlobalLeaderboardComponent
} from "@app-modules/home/components/leaderboard/components/global-leaderboard/components/minutes-global-leaderboard/minutes-global-leaderboard.component";

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'explore',
        component: ExploreComponent,
        children: [
          {
            path: '',
            redirectTo: 'bookshelves',
            pathMatch: 'full'
          },
          {
            path: 'bookshelves',
            component: BookshelvesExploreComponent
          },
          {
            path: 'categories',
            component: CategoriesExploreComponent
          }
        ]
      },
      {
        path: 'challenges',
        component: ChallengesContainerComponent,
        children: [
          {
            path: '',
            component: ChallengesComponent
          },
          {
            path: ':category',
            component: TrophiesComponent
          }
        ]
      },
      {
        path: 'leaderboards',
        component: LeaderboardContainerComponent,
        children: [
          {
            path: '',
            redirectTo: 'global',
            pathMatch: 'full'
          },
          {
            path: 'global',
            component: GlobalLeaderboardComponent,
            children: [
              {
                path: '',
                redirectTo: 'minutes',
                pathMatch: 'full'
              },
              {
                path: 'minutes',
                component: MinutesGlobalLeaderboardComponent
              },
              {
                path: 'books',
                component: BooksGlobalLeaderboardComponent
              },
              {
                path: 'points',
                component: PointsGlobalLeaderboardComponent
              },
            ]
          },
          {
            path: 'friends',
            component: FriendsLeaderboardComponent
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
