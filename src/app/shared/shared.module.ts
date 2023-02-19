import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideNavbarComponent } from "./components/side-navbar/side-navbar.component";
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import { IconComponent } from './components/icon/icon.component';
import { FlexModule } from 'ngx-flexible-layout';

// declarations and exports should be the same (=what this modules export when it is imported in another module)
@NgModule({
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule,
    RouterModule,
    FlexModule
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
