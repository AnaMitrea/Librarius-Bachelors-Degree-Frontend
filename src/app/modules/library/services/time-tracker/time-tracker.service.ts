import {Injectable} from '@angular/core';
import {UserStoreService} from "@app-shared/services/store/user-store.service";

@Injectable({
  providedIn: 'root'
})
export class TimeTrackerService {
  totalTime: number = 0;
  timer: any;

  constructor(private userStoreService: UserStoreService) {  }

  startTimer(bookId: string) {
    // TODO Change 10 seconds to 60 seconds!
    this.setInitialTimeValue(bookId);
    this.timer = setInterval(() => {
      this.totalTime += 1;
      this.updateReadingTimeForBook(bookId);
    }, 10000);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  setInitialTimeValue(bookId: string) {
    const bookTrack = this.userStoreService.bookTimeTracker[bookId];
    if (bookTrack) {
      this.totalTime = bookTrack.timeSpentReading;
    } else {
      this.totalTime = 0;
      this.updateReadingTimeForBook(bookId);
    }
  }

  updateReadingTimeForBook(bookId: string) {
    this.userStoreService.updateReadingTimeForBookId({
      [bookId]: {
        timeSpentReading: this.totalTime
      }
    })
  }

  getTotalTime() {
    return this.totalTime;
  }
}
