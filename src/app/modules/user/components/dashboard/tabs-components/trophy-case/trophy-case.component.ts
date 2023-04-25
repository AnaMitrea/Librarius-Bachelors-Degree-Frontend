import { Component } from '@angular/core';
import {USER_DASHBOARD_ROUTE, USER_DASHBOARD_CLUBS_ROUTE, USER_DASHBOARD_TROPHY_ROUTE} from "@app-utils/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trophy-case',
  templateUrl: './trophy-case.component.html',
  styleUrls: ['./trophy-case.component.scss']
})
export class TrophyCaseComponent {
  protected readonly USER_DASHBOARD_ROUTE = USER_DASHBOARD_ROUTE;
  protected readonly USER_DASHBOARD_CLUBS_ROUTE = USER_DASHBOARD_CLUBS_ROUTE;
  protected readonly USER_DASHBOARD_TROPHY_ROUTE = USER_DASHBOARD_TROPHY_ROUTE;

  constructor(public router: Router) {
  }

  onClickNavigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
