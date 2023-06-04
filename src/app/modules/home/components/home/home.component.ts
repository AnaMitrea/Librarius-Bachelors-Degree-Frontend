import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {EXPLORE_ROUTE} from "@app-utils/constants";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router) {}

  redirectToCollection(key: string) {

  }

  redirectToExplore() {
    this.router.navigate([EXPLORE_ROUTE]);
  }
}
