import { Component } from '@angular/core';

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent {

  openNav = false;

  onNavItemClicked(item: any) {
    // Handle navigation item click event
  }
}
