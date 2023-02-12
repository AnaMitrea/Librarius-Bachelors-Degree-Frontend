import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Components */
import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ContainerComponent } from './components/container/container.component';

import { FlexModule } from 'ngx-flexible-layout';

/* Angular Material */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatStepperModule } from "@angular/material/stepper";


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
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule
  ]
})
export class LandingModule { }
