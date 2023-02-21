import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideNavbarComponent } from "./components/side-navbar/side-navbar.component";
import { RouterModule } from '@angular/router';
import { MatIconModule } from "@angular/material/icon";
import { IconComponent } from './components/icon/icon.component';
import { FlexModule } from 'ngx-flexible-layout';
import { MatDividerModule } from '@angular/material/divider';

// declarations and exports should be the same (=what this modules export when it is imported in another module)
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
    IconComponent,
  ],
  exports: [
    TopBarComponent,
    SideNavbarComponent
  ]
})
export class SharedModule { }
