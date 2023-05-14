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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
