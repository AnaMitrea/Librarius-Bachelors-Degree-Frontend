import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { HomeComponent } from "@app-modules/home/components/home/home.component";
import { ExploreComponent } from "@app-modules/home/components/explore/explore.component";
import { ChallengesComponent } from "@app-modules/home/components/challenges-container/components/challenges/challenges.component";
import { TrophiesComponent } from "@app-modules/home/components/challenges-container/components/trophies/trophies.component";
import {ChallengesContainerComponent} from "@app-modules/home/components/challenges-container/challenges-container.component";

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
        component: ExploreComponent
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
