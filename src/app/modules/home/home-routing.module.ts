import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from "./components/container/container.component";
import { HomeComponent } from "@app-modules/home/components/home/home.component";
import { ExploreComponent } from "@app-modules/home/components/explore/explore.component";
import { ChallengesComponent } from "@app-modules/home/components/challenges/challenges.component";

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
        component: ChallengesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
