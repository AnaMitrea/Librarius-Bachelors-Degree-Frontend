import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MINUTES_ELEMENT_DATA, RankByMinutesElement} from "@app-modules/home/components/leaderboard/shared/table";
import {LeaderboardsService} from "@app-modules/home/components/leaderboard/services/leaderboards/leaderboards.service";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {RankByMinutesResponseModel} from "@app-modules/home/components/leaderboard/shared/api.models";

@Component({
  selector: 'app-minutes-global-leaderboard',
  templateUrl: './minutes-global-leaderboard.component.html',
  styleUrls: ['./minutes-global-leaderboard.component.scss']
})
export class MinutesGlobalLeaderboardComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['position', 'user', 'minutesLogged'];
  dataSource: any;

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: RankByMinutesElement) => {
        if (element.position === 1) {
          return `<div style="background-color: gold; width: 20px; height: 20px; border-radius: 50%;"></div>`;
        } else if (element.position === 2) {
          return `<div style="background-color: silver; width: 20px; height: 20px; border-radius: 50%;"></div>`;
        } else if (element.position === 3) {
          return `<div style="background-color: saddlebrown; width: 20px; height: 20px; border-radius: 50%;"></div>`;
        } else {
          return `${element.position}`;
        }
      },
    },
    {
      columnDef: 'user',
      header: 'Reader',
      cell: (element: RankByMinutesElement) => `${element.user}`,
    },
    {
      columnDef: 'minutesLogged',
      header: 'Minutes Logged',
      cell: (element: RankByMinutesElement) => `${element.minutesLogged}`,
    }
  ];

  constructor(private leaderboardService: LeaderboardsService) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.leaderboardService.getAllUsersRankByMinutesDesc()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<RankByMinutesResponseModel[]>) => {
        let mappedData = data.result.map(item => ({
          position: item.position,
          user: item.username,
          minutesLogged: item.minutesLogged
        }));
        this.dataSource = new MatTableDataSource(mappedData);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
