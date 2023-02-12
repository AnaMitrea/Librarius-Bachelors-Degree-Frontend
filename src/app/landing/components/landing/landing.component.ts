import { Component } from '@angular/core';
import { REGISTER_ROUTE } from '../../shared/constants';
import { Router } from '@angular/router';

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
