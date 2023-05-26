import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TimeTrackerService } from '@app-modules/library/services/time-tracker/time-tracker.service';
import { take } from 'rxjs';
import { ApiResponseModel } from '@app-core/domain/model/api-response-model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '@app-modules/library/services/book/book.service';

@Component({
  selector: 'app-reading-progress',
  templateUrl: './reading-progress.component.html',
  styleUrls: ['./reading-progress.component.scss']
})
export class ReadingProgressComponent implements OnInit, OnDestroy {
  bookId!: string;

  avgReadingTime: any;
  readingProgress: number = 0;
  remainingTime: string = '0h 0m';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private timeTrackerService: TimeTrackerService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  @HostListener('window:popstate')
  onWindowPopState() {
    // alert("on back button");
    this.saveReadingTime();

    return false;
  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: Event) {
    if (document.hidden) {
      // alert("on tab change");
      this.saveReadingTime();
      return false;
    }
    return true;
  }

  initSubscription() {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.bookId = params.get('id')!;

      this.bookService
        .getBookAverageReadingTime(this.bookId)
        .pipe(take(1))
        .subscribe((data: ApiResponseModel<any>) => {
          this.avgReadingTime = data.result;
          this.updateReadingProgress();
        });

      this.timeTrackerService.startTimer(this.bookId);
    });

    this.timeTrackerService.minutePassed.subscribe(() => {
      this.updateReadingProgress();
    });
  }

  saveReadingTime() {
    this.timeTrackerService.updateReadingTimeForBook(this.bookId);
  }

  updateReadingProgress() {
    const totalReadingTime = this.timeTrackerService.getTimeSpentOnBook();

    const totalMinutes =
      (this.avgReadingTime.hours || 0) * 60 + (this.avgReadingTime.minutes || 0);
    const remainingMinutes = totalMinutes - totalReadingTime;
    const hours = Math.floor(remainingMinutes / 60);
    const minutes = remainingMinutes % 60;

    this.readingProgress = (totalReadingTime / totalMinutes) * 100;
    this.remainingTime = `${hours}h ${minutes}m`;
  }

  ngOnDestroy(): void {
    this.saveReadingTime();
    this.timeTrackerService.stopTimer();
  }
}
