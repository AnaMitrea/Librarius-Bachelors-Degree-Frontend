import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { FlexModule } from 'ngx-flexible-layout';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import {
  AuthorsComponent,
  ContainerComponent,
  DashboardComponent,
  WishlistComponent,
  StatisticsComponent,
  SettingsComponent,
  SideNavbarComponent
} from './components';

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
    FlexModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class UserModule { }
