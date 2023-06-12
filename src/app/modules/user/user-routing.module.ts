import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthorsComponent,
  ContainerComponent,
  DashboardComponent,
  SettingsComponent,
  StatisticsComponent,
  WishlistComponent
} from "@app-modules/user/components";
import {
  UserOverviewComponent
} from "@app-modules/user/components/dashboard/tabs-components/user-overview/user-overview.component";
import {
  TrophyCaseComponent
} from "@app-modules/user/components/dashboard/tabs-components/trophy-case/trophy-case.component";
import { ClubsComponent } from "@app-modules/user/components/dashboard/tabs-components/clubs/clubs.component";


const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: UserOverviewComponent,
          },
          {
            path: 'trophy-case',
            component: TrophyCaseComponent,
          },
          {
            path: 'clubs',
            component: ClubsComponent,
          },
        ]
      },
      {
        path: 'favorites',
        component: WishlistComponent
      },
      {
        path: 'authors',
        component: AuthorsComponent
      },
      {
        path: 'statistics',
        component: StatisticsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
