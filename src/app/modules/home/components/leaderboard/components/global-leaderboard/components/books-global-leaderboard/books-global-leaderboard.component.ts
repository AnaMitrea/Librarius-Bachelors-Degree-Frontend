import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { RankByBooksElement } from "@app-modules/home/components/leaderboard/shared/table";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {LeaderboardsService} from "@app-modules/home/components/leaderboard/services/leaderboards/leaderboards.service";
import {
  RankByBooksResponseModel
} from "@app-modules/home/components/leaderboard/shared/api.models";

@Component({
  selector: 'app-books-global-leaderboard',
  templateUrl: './books-global-leaderboard.component.html',
  styleUrls: ['./books-global-leaderboard.component.scss']
})
export class BooksGlobalLeaderboardComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['position', 'user', 'booksRead'];
  dataSource: any;

  columns = [
    {
      columnDef: 'position',
      header: 'No.',
      cell: (element: RankByBooksElement) => `${element.position}`,
    },
    {
      columnDef: 'user',
      header: 'Reader',
      cell: (element: RankByBooksElement) => `${element.user}`,
    },
    {
      columnDef: 'booksRead',
      header: 'Books Read',
      cell: (element: RankByBooksElement) => `${element.booksRead}`,
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
    this.leaderboardService.getAllUsersRankByNumberOfBooksDesc()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<RankByBooksResponseModel[]>) => {
        let mappedData = data.result.map(item => ({
          position: item.position,
          user: item.username,
          booksRead: item.numberOfBooks
        }));
        this.dataSource = new MatTableDataSource(mappedData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
