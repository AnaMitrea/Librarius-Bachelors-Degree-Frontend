import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ContainerComponent } from './components/container/container.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexModule } from 'ngx-flexible-layout';


@NgModule({
  declarations: [
    ContainerComponent,
    SideNavbarComponent,
    DashboardComponent,
    WishlistComponent,
    AuthorsComponent,
    StatisticsComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatIconModule,
    FlexModule
  ]
})
export class UserModule { }
