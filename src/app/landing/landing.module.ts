import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FlexModule } from 'ngx-flexible-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from './components/container/container.component';


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ContainerComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    FlexModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class LandingModule { }
