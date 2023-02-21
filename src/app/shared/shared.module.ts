import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideNavbarComponent } from "./components/side-navbar/side-navbar.component";
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { FlexModule } from 'ngx-flexible-layout';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    FlexModule,
    MatDividerModule
  ],
  declarations: [
    TopBarComponent,
    SideNavbarComponent,
  ],
  exports: [
    TopBarComponent,
    SideNavbarComponent
  ]
})
export class SharedModule { }
