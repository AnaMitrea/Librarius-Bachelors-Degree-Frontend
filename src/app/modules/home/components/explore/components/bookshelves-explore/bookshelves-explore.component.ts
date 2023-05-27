import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE} from "@app-utils/constants";
import {Subject, takeUntil} from "rxjs";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {BookshelfBooksDto, BookshelfDto} from "@app-modules/home/shared/models/bookshelf.dto";
import {mapBookDtoToBook} from "@app-modules/home/components/home/services/transformers";
import {Book} from "@app-modules/home/shared/models";

@Component({
  selector: 'app-bookshelves-explore',
  templateUrl: './bookshelves-explore.component.html',
  styleUrls: ['./bookshelves-explore.component.scss']
})
export class BookshelvesExploreComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bookshelfMenu!: BookshelfDto[];
  bookshelves!: BookshelfBooksDto;

  constructor(
    private router: Router,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.exploreService.getBookshelves()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        this.bookshelfMenu = data.result;
      });

    this.exploreService.getBookshelvesBooks(10)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        this.bookshelves = data.result;
        this.mapBooks();
      });
  }

  private mapBooks(): void {
    for (const key in this.bookshelves) {
      if (this.bookshelves.hasOwnProperty(key)) {
        const bookshelf = this.bookshelves[key];
        this.bookshelves[key].books = bookshelf.books.map((book: Book, idx: number) => mapBookDtoToBook(book, idx));
      }
    }
  }

  scrollToBookshelf(id: number): void {
    const element = document.getElementById(String(id));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getSliderTitle(key: string, counter: number) {
    return `${key} (${counter})`;
  }

  getHeaderRouteForBookshelf(id: number) {
    //  /home/explore/bookshelves/{id}
    return `${EXPLORE_BOOKSHELVES_ROUTE}/${id}`;
  }

  getBookshelfKeys(): string[] {
    return Object.keys(this.bookshelves);
  }

  onTabRedirect(path: string) {
    const url = path === 'bookshelves' ? EXPLORE_BOOKSHELVES_ROUTE : EXPLORE_CATEGORIES_ROUTE;
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
