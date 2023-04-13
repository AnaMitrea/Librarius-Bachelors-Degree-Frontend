import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LANDING_ROUTE, LOGIN_ROUTE } from '@app-utils/constants';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {

  constructor(private router: Router) { }

  onLoginClick() {
    this.router.navigateByUrl(LOGIN_ROUTE).then();
  }

  onLogoClick() {
    this.router.navigateByUrl(LANDING_ROUTE).then();
  }
}
