import {Component, OnDestroy, OnInit} from '@angular/core';
import { USER_DASHBOARD_CLUBS_ROUTE, USER_DASHBOARD_ROUTE, USER_DASHBOARD_TROPHY_ROUTE } from "@app-utils/constants";
import { IsActiveMatchOptions, Router } from "@angular/router";
import {MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {UserDashboardService} from "@app-modules/user/services/dashboard/user-dashboard.service";
import {Utils as U} from "@app-utils/lodash/utils";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {DashboardUserInformationDto} from "@app-modules/user/components/dashboard/models";
import {Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'user-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  protected readonly USER_DASHBOARD_ROUTE = USER_DASHBOARD_ROUTE;
  protected readonly USER_DASHBOARD_CLUBS_ROUTE = USER_DASHBOARD_CLUBS_ROUTE;
  protected readonly USER_DASHBOARD_TROPHY_ROUTE = USER_DASHBOARD_TROPHY_ROUTE;
  protected readonly matchOptions: IsActiveMatchOptions = {
    paths: 'exact',
    matrixParams: 'exact',
    queryParams: 'subset',
    fragment: 'ignored'
  };
  private destroy$ = new Subject<void>();

  userInformation!: DashboardUserInformationDto;
  userActivityDates!: any[];

  // todo remove this
  datesToHighlight = ["2023-05-01T18:30:00.000Z", "2023-05-24T18:30:00.000Z","2023-05-25T18:30:00.000Z", "2023-05-26T18:30:00.000Z", "2023-05-27T18:30:00.000Z", "2023-05-29T18:30:00.000Z"];

  constructor(
    public router: Router,
    private dashboardService: UserDashboardService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getUserInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel) => {
      this.userInformation = (U.path(['result'], data)) as DashboardUserInformationDto;
    })

    // this.dashboardService.getUserActivity()
    // .pipe(takeUntil(this.destroy$))
    // .subscribe((data: ApiResponseModel) => {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
