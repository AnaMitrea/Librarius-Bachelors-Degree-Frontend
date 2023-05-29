import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {
  LEADERBOARDS_GLOBAL_BOOKS_ROUTE,
  LEADERBOARDS_GLOBAL_MINUTES_ROUTE,
  LEADERBOARDS_GLOBAL_POINTS_ROUTE
} from "@app-utils/constants";

@Component({
  selector: 'app-global-leaderboard',
  templateUrl: './global-leaderboard.component.html',
  styleUrls: ['./global-leaderboard.component.scss']
})
export class GlobalLeaderboardComponent {
  protected readonly LEADERBOARDS_GLOBAL_MINUTES_ROUTE = LEADERBOARDS_GLOBAL_MINUTES_ROUTE;
  protected readonly LEADERBOARDS_GLOBAL_BOOKS_ROUTE = LEADERBOARDS_GLOBAL_BOOKS_ROUTE;
  protected readonly LEADERBOARDS_GLOBAL_POINTS_ROUTE = LEADERBOARDS_GLOBAL_POINTS_ROUTE;


  constructor(private router: Router) {
  }

  getClickedRankByKey(value: string): string {
    return value;
  }

  onButtonClick(path: string) {
    this.router.navigate([path]);
  }
}
