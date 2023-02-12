import { Component } from '@angular/core';
import {LANDING_ROUTE, LOGIN_ROUTE} from '../../shared/constants';
import { Router } from '@angular/router';

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
