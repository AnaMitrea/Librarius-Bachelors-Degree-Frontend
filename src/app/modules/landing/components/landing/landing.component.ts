import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { REGISTER_ROUTE } from '@app-utils/constants';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  constructor(private router: Router) { }

  onCreateAccountClick() {
    this.router.navigateByUrl(REGISTER_ROUTE).then();
  }
}
