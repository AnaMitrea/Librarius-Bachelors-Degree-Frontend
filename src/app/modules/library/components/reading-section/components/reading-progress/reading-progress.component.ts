import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { TimeTrackerService } from '@app-modules/library/services/time-tracker/time-tracker.service';
import { take } from 'rxjs';
import { ApiResponseModel } from '@app-core/domain/model/api-response-model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '@app-modules/library/services/book/book.service';
import {BookReadingTimeRequestDto} from "@app-shared/models/transfer/book-dto";
import {ToastrService} from "ngx-toastr";
import {POSITION_CLASS} from "@app-utils/constants";

@Component({
  selector: 'app-reading-progress',
  templateUrl: './reading-progress.component.html',
  styleUrls: ['./reading-progress.component.scss']
})
export class ReadingProgressComponent implements OnInit, OnDestroy {
  @Input() colorModeClass!: string;

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
    private timeTrackerService: TimeTrackerService,
    private toasterService: ToastrService
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

      this.bookService.getBookAverageReadingTime(Number(this.bookId))
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
    const timeSpent = this.timeTrackerService.getTimeSpentOnBook();
    if (timeSpent < 1) return;

    const body: BookReadingTimeRequestDto = {
      bookId: parseInt(this.bookId, 10),
      timeSpent: timeSpent
    };

    this.bookService.saveReadingTimeForBook(body)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data && data.result === true) {
          this.toasterService.success("Check your profile for won challenges!", "Congratulations", POSITION_CLASS);
        }
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
          if (data && data.result === true) {
            this.toasterService.success("Check your profile for won challenges!", "Congratulations", POSITION_CLASS);
          }
        });
      this.isButtonDisabled = true;
      this.saveStoreReadingTime();
      this.timeTrackerService.stopTimer();
    }
  }


  ngOnDestroy(): void {
    this.saveStoreReadingTime();
    this.timeTrackerService.stopTimer();
  }
}
