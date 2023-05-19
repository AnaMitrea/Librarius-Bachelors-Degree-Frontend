import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@app-modules/library/services/book/book.service';
import {BookDto, ReadingTimeDto} from '@app-shared/models/transfer/book-dto';
import {API_GUTENBERG_URL} from "@app-core/constants";
import { LIBRARY_BOOK_ROUTE, READ } from '@app-utils/constants';
import {Subject, take, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.scss']
})
export class BookViewerComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();
  bookId!: string;
  currentPath: string;
  bookData!: BookDto;
  avgReadingTime!: ReadingTimeDto;
  ratingValue = 0;
  maxStars = 10;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private location: Location
  ) {
    // todo do the correct link
    this.currentPath = this.location.path();
  }

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id') ?? '';

      this.bookService.getBookData(this.bookId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ApiResponseModel) => {
          this.bookData = data.result;
      });

      this.bookService.getBookAverageReadingTime(this.bookId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: ApiResponseModel) => {
          this.avgReadingTime = data.result;
      });
    });
  }

  processAuthorName(author: string): string {
    return author.replace(/,/, '');
  }

  receiveOverallRating(data: number) {
    this.ratingValue = data ? data : 0;
  }

  getCoverImageUrl() {
    return `${API_GUTENBERG_URL}${this.bookData.coverImageUrl}`;
  }

  onAuthorClick(author: string) {
    console.log(author);
  }

  onReadClick(id: string) {
    this.router.navigate([LIBRARY_BOOK_ROUTE, id, READ]);
  }

  onAddToFavorite(id: string) {
    console.log(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
