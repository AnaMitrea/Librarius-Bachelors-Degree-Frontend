import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ExploreCategoryBooksDto} from "@app-modules/home/shared/models/explore.dto";
import {Router} from "@angular/router";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Book} from "@app-modules/home/shared/models";
import {mapBookDtoToBook} from "@app-modules/home/components/home/shared/transformers";
import {EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE} from "@app-utils/constants";

@Component({
  selector: 'app-preview-category-explore',
  templateUrl: './preview-category-explore.component.html',
  styleUrls: ['./preview-category-explore.component.scss']
})
export class PreviewCategoryExploreComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  bookshelfCategories!: ExploreCategoryBooksDto[];

  maxResults = 10;

  constructor(
    private router: Router,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.exploreService.getCategoriesBooks(this.maxResults)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        this.bookshelfCategories = this.mapExploreCategoryBooksDto(data.result);
      });
  }

  mapExploreCategoryBooksDto(bookshelfCateg: any): ExploreCategoryBooksDto[] {
    return bookshelfCateg.map((categoryBooksDto: any )=> ({
      ...categoryBooksDto,
      categories: this.mapCategories(categoryBooksDto.categories)
    }));
  }

  mapCategories(categories: any): any {
    return categories.map((category: any) => ({
      ...category,
      books: this.mapBooks(category.books)
    }));
  }

  mapBooks(booksData: any[]): Book[] {
    return booksData.map((book, idx) => mapBookDtoToBook(book, idx));
  }

  getSliderTitle(key: string, counter: number) {
    return `${key} (${counter})`;
  }

  getHeaderRouteForCategory(bookshelfKey: string, key: string) {
    return `${EXPLORE_CATEGORIES_ROUTE}/${bookshelfKey}/${key}`;
  }

  getHeaderRouteForBookshelf(key: string) {
    return `${EXPLORE_BOOKSHELVES_ROUTE}/${key}`;
  }

  onCategoryTitleClick(path: string) {
    this.router.navigate([path]).then();
  }

  onBookshelfTitleClick(path: string) {
    this.router.navigate([path]).then();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
