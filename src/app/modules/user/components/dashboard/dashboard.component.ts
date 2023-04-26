import { Component } from '@angular/core';
import { USER_DASHBOARD_CLUBS_ROUTE, USER_DASHBOARD_ROUTE, USER_DASHBOARD_TROPHY_ROUTE } from "@app-utils/constants";
import { IsActiveMatchOptions, Router } from "@angular/router";

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  protected readonly USER_DASHBOARD_ROUTE = USER_DASHBOARD_ROUTE;
  protected readonly USER_DASHBOARD_CLUBS_ROUTE = USER_DASHBOARD_CLUBS_ROUTE;
  protected readonly USER_DASHBOARD_TROPHY_ROUTE = USER_DASHBOARD_TROPHY_ROUTE;
  protected readonly matchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'exact',
    queryParams: 'subset',
    fragment: 'ignored'
  };

  selected: Date | undefined;

  constructor(public router: Router) {}

  setStreakDateClass() {
    // return (date: Date): MatCalendarCellCssClasses => {
    //
    // }
  }

  onClickNavigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
