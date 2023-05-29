import {Component, OnDestroy, OnInit} from '@angular/core';
import {LEADERBOARDS_FRIENDS_ROUTE, LEADERBOARDS_ROUTE} from "@app-utils/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-leaderboard-container',
  templateUrl: './leaderboard-container.component.html',
  styleUrls: ['./leaderboard-container.component.scss']
})
export class LeaderboardContainerComponent implements OnInit, OnDestroy{
  protected readonly LEADERBOARDS_FRIENDS_ROUTE = LEADERBOARDS_FRIENDS_ROUTE;
  protected readonly LEADERBOARDS_ROUTE = LEADERBOARDS_ROUTE;

  constructor(private router: Router) {}

  onChipClick(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
