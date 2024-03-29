import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexModule } from 'ngx-flexible-layout';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '@app-shared/shared.module';
import {
  AuthorsComponent,
  ContainerComponent,
  DashboardComponent,
  WishlistComponent,
  StatisticsComponent,
  SideNavbarComponent
} from './components';
import { UserOverviewComponent } from './components/dashboard/tabs-components/user-overview/user-overview.component';
import { TrophyCaseComponent } from './components/dashboard/tabs-components/trophy-case/trophy-case.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {HomeModule} from "@app-modules/home/home.module";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    ContainerComponent,
    SideNavbarComponent,
    DashboardComponent,
    WishlistComponent,
    AuthorsComponent,
    StatisticsComponent,
    UserOverviewComponent,
    TrophyCaseComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatIconModule,
    FlexModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatTooltipModule,
    HomeModule,
    MatButtonModule
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class UserModule { }
