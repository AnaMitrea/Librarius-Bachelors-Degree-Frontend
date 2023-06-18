import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_ROUTE} from "@app-utils/constants";
import {TrendingService} from "@app-modules/home/components/home/services/trending/trending.service";
import {HomeBookshelfDto} from "@app-modules/home/models/HomeBookshelfDto";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  bookshelves!: HomeBookshelfDto[];

  constructor(private router: Router, private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.trendingService.getRandomBookshelves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.bookshelves = data.result;
        }
      });
  }

  getColorClass(idx: number) {
    return `bck-color${idx}`;
  }

  redirectToCollection(key: string) {
    this.router.navigate([EXPLORE_BOOKSHELVES_ROUTE, key]);
  }

  redirectToExplore() {
    this.router.navigate([EXPLORE_ROUTE]);
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
