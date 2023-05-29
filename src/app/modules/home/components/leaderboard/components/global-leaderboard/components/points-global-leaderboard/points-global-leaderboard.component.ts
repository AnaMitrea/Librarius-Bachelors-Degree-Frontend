import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RankByPointsElement} from "@app-modules/home/components/leaderboard/shared/table";
import {Subject, takeUntil} from "rxjs";
import {LeaderboardsService} from "@app-modules/home/components/leaderboard/services/leaderboards/leaderboards.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {RankByPointsResponseModel} from "@app-modules/home/components/leaderboard/shared/api.models";

@Component({
  selector: 'app-points-global-leaderboard',
  templateUrl: './points-global-leaderboard.component.html',
  styleUrls: ['./points-global-leaderboard.component.scss']
})
export class PointsGlobalLeaderboardComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['position', 'user', 'points'];
  dataSource: any;

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: RankByPointsElement) => `${element.position}`,
    },
    {
      columnDef: 'user',
      header: 'Reader',
      cell: (element: RankByPointsElement) => `${element.user}`,
    },
    {
      columnDef: 'points',
      header: 'Points',
      cell: (element: RankByPointsElement) => `${element.points}`,
    }
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private leaderboardService: LeaderboardsService) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.leaderboardService.getAllUsersRankByPointsDesc()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<RankByPointsResponseModel[]>) => {
        let mappedData = data.result.map(item => ({
          position: item.position,
          user: item.username,
          points: item.points
        }));
        this.dataSource = new MatTableDataSource(mappedData);
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
