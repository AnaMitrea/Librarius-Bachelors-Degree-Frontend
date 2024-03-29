import {EventEmitter, Injectable} from '@angular/core';
import {UserStoreService} from "@app-store/services/user-store.service";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {
  timeSpentBook: number = 0;
  timer: any;
  minutePassed = new EventEmitter<void>();

  constructor(private userStoreService: UserStoreService) {  }

  startTimer(bookId: string) {
    this.setInitialTimeValue(bookId);
    this.timer = setInterval(() => {
      this.timeSpentBook += 1;
      this.updateReadingTimeForBook(bookId);
      this.minutePassed.emit();
    }, 60000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  setInitialTimeValue(bookId: string) {
    const bookTrack = this.userStoreService.activity.bookTimeTracker[bookId];
    if (bookTrack && bookTrack.minutesSpent) {
      this.timeSpentBook = bookTrack.minutesSpent;
    } else {
      this.timeSpentBook = 0;
      this.updateReadingTimeForBook(bookId);
    }
  }

  updateReadingTimeForBook(bookId: string) {
    if (this.timeSpentBook < 1) return;

    this.userStoreService.updateReadingTimeForBook({
      [bookId]: {
        minutesSpent: this.timeSpentBook
      }
    })
  }

  getTimeSpentOnBook() {
    return this.timeSpentBook;
  }
}
