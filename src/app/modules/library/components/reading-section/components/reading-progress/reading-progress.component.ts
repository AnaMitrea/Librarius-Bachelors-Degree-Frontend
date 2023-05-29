import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { TimeTrackerService } from '@app-modules/library/services/time-tracker/time-tracker.service';
import { take } from 'rxjs';
import { ApiResponseModel } from '@app-core/domain/model/api-response-model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '@app-modules/library/services/book/book.service';
import {BookReadingTimeRequestDto} from "@app-shared/models/transfer/book-dto";

@Component({
  selector: 'app-reading-progress',
  templateUrl: './reading-progress.component.html',
  styleUrls: ['./reading-progress.component.scss']
})
export class ReadingProgressComponent implements OnInit, OnDestroy {
  bookId!: string;
  isAlreadyFinished!: boolean;

  hasDataLoaded = false;
  isButtonDisabled = false;

  avgReadingTime: any;
  readingProgress: number = 0;
  remainingTime: string = '0h 0m';

  ALREADY_FINISHED_MESSAGE = 'You already finished reading this book.';
  CONTINUE_READING_MESSAGE = 'Please continue reading to finish the book.';

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
    alert("Are you sure you want to close the book?\nTake a moment to reflect on what you've read and savor the knowledge gained.");
    this.saveStoreReadingTime();
    this.saveReadingTimeForBook();

    return false;
  }

  @HostListener('document:visibilitychange', ['$event'])
  onVisibilityChange(event: Event) {
    if (document.hidden) {
      alert("Are you sure you want to close the book?\nTake a moment to reflect on what you've read and savor the knowledge gained.");
      this.saveStoreReadingTime();
      this.saveReadingTimeForBook();
      return false;
    }
    return true;
  }

  initSubscription() {
    this.route.paramMap.pipe(take(1)).subscribe(params => {
      this.bookId = params.get('id')!;

      this.bookService.checkIsBookFinished(this.bookId)
        .pipe(take(1))
        .subscribe((data: ApiResponseModel<boolean>) => {
         this.isAlreadyFinished = data.result;
         this.isButtonDisabled = this.isAlreadyFinished;
        });

      this.bookService.getBookAverageReadingTime(this.bookId)
        .pipe(take(1))
        .subscribe((data: ApiResponseModel<any>) => {
          this.avgReadingTime = data.result;
          this.updateReadingProgress();
          this.hasDataLoaded = true;
        });

      this.timeTrackerService.startTimer(this.bookId);
    });

    this.timeTrackerService.minutePassed.subscribe(() => {
      this.updateReadingProgress();
    });
  }

  saveStoreReadingTime() {
    this.timeTrackerService.updateReadingTimeForBook(this.bookId);
  }

  saveReadingTimeForBook() {
    const body: BookReadingTimeRequestDto = {
      bookId: parseInt(this.bookId, 10),
      timeSpent: this.timeTrackerService.getTimeSpentOnBook()
    };

    this.bookService.saveReadingTimeForBook(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        console.log("saveReadingTimeForBook")
        console.log(data);
      });
  }

  updateReadingProgress() {
    const totalReadingTime = this.timeTrackerService.getTimeSpentOnBook();

    const totalMinutes =
      (this.avgReadingTime.hours || 0) * 60 + (this.avgReadingTime.minutes || 0);
    const remainingMinutes = totalMinutes - totalReadingTime;

    const remainingHours = Math.floor(Math.abs(remainingMinutes) / 60);
    const remainingMinutesDisplay = Math.abs(remainingMinutes) % 60;

    this.readingProgress = (totalReadingTime / totalMinutes) * 100;

    if (remainingMinutes < 0) {
      this.remainingTime = `-${remainingHours}h ${remainingMinutesDisplay}m`;
    } else {
      this.remainingTime = `${remainingHours}h ${remainingMinutesDisplay}m`;
    }

    this.isButtonDisabled = this.isAlreadyFinished || (totalReadingTime < totalMinutes);
  }

  onFinishReadingBook() {
    const totalReadingTime = this.timeTrackerService.getTimeSpentOnBook();
    const totalMinutes =
      (this.avgReadingTime?.hours || 0) * 60 + (this.avgReadingTime?.minutes || 0);

    if (totalReadingTime >= totalMinutes) {
      const body: BookReadingTimeRequestDto = {
        bookId: parseInt(this.bookId, 10),
        timeSpent: totalReadingTime
      };

      this.bookService.markBookAsFinished(body)
        .pipe(take(1))
        .subscribe((data: ApiResponseModel<any>) => {
          console.log("onFinishReadingBook");
          console.log(data);
        });

      this.saveStoreReadingTime();
      this.timeTrackerService.stopTimer();
    }
  }


  ngOnDestroy(): void {
    this.saveStoreReadingTime();
    this.timeTrackerService.stopTimer();
  }
}
