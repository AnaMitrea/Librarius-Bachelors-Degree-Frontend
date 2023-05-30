import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReadingFeedService} from "@app-modules/home/components/home/services/reading-feed/reading-feed.service";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {UserReadingFeed} from "@app-shared/models/transfer/user-dto";
import {LIBRARY_BOOK_ROUTE} from "@app-utils/constants";

@Component({
  selector: 'app-reading-feed',
  templateUrl: './reading-feed.component.html',
  styleUrls: ['./reading-feed.component.scss']
})
export class ReadingFeedComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  users!: UserReadingFeed[];

  constructor(
    private router: Router,
    private readingFeedService: ReadingFeedService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.readingFeedService.getReadingFeedBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {

        this.users = data.result.map((item: any) => ({
          username: item.username,
          nameInitial: item.nameInitial,
          book: {
            id: item.book.id,
            title: item.book.title,
            url: `${LIBRARY_BOOK_ROUTE}/${item.book.id}`
          }
        }));
      });
  }

  onBookTitleClick(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
