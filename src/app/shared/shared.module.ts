import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideNavbarComponent } from "./components/side-navbar/side-navbar.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

// declarations and exports should be the same (=what this modules export when it is imported in another module)
@NgModule({
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatIconModule
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
