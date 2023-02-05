import { Component } from '@angular/core';
import { LOGIN_ROUTE } from '../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
  loginRoute = LOGIN_ROUTE;

  constructor(private router: Router) { }

  onLoginClick() {
    this.router.navigateByUrl(LOGIN_ROUTE).then(() => {
      window.location.reload();
    });
  }
}
