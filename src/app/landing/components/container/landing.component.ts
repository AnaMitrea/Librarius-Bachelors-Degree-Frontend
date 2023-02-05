import { Component } from '@angular/core';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  loginRoute = LOGIN_ROUTE;

  constructor(private router: Router) { }

  onLoginClick() {
    this.router.navigateByUrl(LOGIN_ROUTE).then(() => {
      window.location.reload();
    });
  }

  onCreateAccountClick() {
    this.router.navigateByUrl(REGISTER_ROUTE).then(() => {
      window.location.reload();
    });
  }
}
