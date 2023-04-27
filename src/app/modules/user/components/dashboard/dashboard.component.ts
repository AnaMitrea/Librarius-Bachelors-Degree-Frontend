import {Component, OnInit} from '@angular/core';
import { USER_DASHBOARD_CLUBS_ROUTE, USER_DASHBOARD_ROUTE, USER_DASHBOARD_TROPHY_ROUTE } from "@app-utils/constants";
import { IsActiveMatchOptions, Router } from "@angular/router";
import {MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {UserDashboardService} from "@app-modules/user/services/dashboard/user-dashboard.service";
import {Utils as U} from "@app-utils/lodash/utils";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  protected readonly USER_DASHBOARD_ROUTE = USER_DASHBOARD_ROUTE;
  protected readonly USER_DASHBOARD_CLUBS_ROUTE = USER_DASHBOARD_CLUBS_ROUTE;
  protected readonly USER_DASHBOARD_TROPHY_ROUTE = USER_DASHBOARD_TROPHY_ROUTE;
  protected readonly matchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'exact',
    queryParams: 'subset',
    fragment: 'ignored'
  };
  userActivityDates!: any[];
  datesToHighlight = ["2023-04-01T18:30:00.000Z", "2023-04-24T18:30:00.000Z","2023-04-25T18:30:00.000Z", "2023-04-26T18:30:00.000Z", "2023-04-27T18:30:00.000Z", "2023-04-29T18:30:00.000Z"];

  constructor(
    public router: Router,
    private dashboardService: UserDashboardService
  ) {}

  ngOnInit(): void {
    // this.dashboardService.getUserActivity().subscribe((data: ApiResponseModel) => {
    //   this.userActivityDates = U.path(['result', ''], data);
    // });
    this.userActivityDates = this.datesToHighlight;
  }

  setStreakDateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.userActivityDates
        .map(strDate => new Date(strDate))
        .some(d => {
          const isSameDate = d.getDate() === date.getDate();
          const isSameMonth = d.getMonth() === date.getMonth();
          const isSameYear = d.getFullYear() === date.getFullYear();
          return isSameDate && isSameMonth && isSameYear;
        });
      return highlightDate ? 'highlight-date' : '';
    };
  }

  onClickNavigate(path: string) {
    this.router.navigateByUrl(path);
  }


}
