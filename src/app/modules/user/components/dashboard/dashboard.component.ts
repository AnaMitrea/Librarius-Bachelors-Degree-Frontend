import {Component, OnDestroy, OnInit} from '@angular/core';
import { USER_DASHBOARD_CLUBS_ROUTE, USER_DASHBOARD_ROUTE, USER_DASHBOARD_TROPHY_ROUTE } from "@app-utils/constants";
import { IsActiveMatchOptions, Router } from "@angular/router";
import {MatCalendarCellCssClasses} from "@angular/material/datepicker";
import {UserDashboardService} from "@app-modules/user/services/dashboard/user-dashboard.service";
import { formatDate } from '@angular/common';
import {DashboardUserInformationDto} from "@app-modules/user/components/dashboard/models";
import {Subject, takeUntil} from "rxjs";
import {UserStoreService} from "@app-store/services/user-store.service";
import {UserService} from "@app-shared/services/app/user/user.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

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

  constructor(
    public router: Router,
    private dashboardService: UserDashboardService,
    private sharedUserStoreService: UserStoreService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initUserFromState();
    this.initUserSubscriptions();
  }

  initUserFromState() {
    this.userInformation = {
      username: this.sharedUserStoreService.username,
      currentStreak: this.sharedUserStoreService.activity.currentStreak,
      longestStreak: this.sharedUserStoreService.activity.longestStreak,
      points: this.sharedUserStoreService.stats.points,
      level: this.sharedUserStoreService.stats.level
    };
  }

  initUserSubscriptions() {
    this.userService.getUserActivity()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<string[]>) => {
        if (data) {
          this.userActivityDates = data.result;
        }
      })
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
