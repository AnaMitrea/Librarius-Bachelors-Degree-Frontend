import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Book } from '../../models';
import { NOW, WEEK } from '@app-utils/constants';
import { TrendingService } from '../../services/trending.service';

@Component({
  selector: 'app-trending-section',
  templateUrl: './trending-section.component.html',
  styleUrls: ['./trending-section.component.scss']
})
export class TrendingSectionComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  public trendingNowData!: Book[];
  public trendingWeekData!: Book[];

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.trendingService.getTrendingBooks(NOW)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.trendingNowData = response;
    });

    this.trendingService.getTrendingBooks(WEEK)
      .pipe(takeUntil(this.destroy$))
      .subscribe((response: any) => {
        this.trendingWeekData = response;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
