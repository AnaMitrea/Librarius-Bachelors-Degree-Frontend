import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import { EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE } from "@app-utils/constants";
import {ExploreCategoryBooksDto} from "@app-modules/home/shared/models/explore.dto";
import {Book} from "@app-modules/home/shared/models";
import {mapBookDtoToBook} from "src/app/modules/home/components/home/shared/transformers";

@Component({
  selector: 'app-categories-explore',
  templateUrl: './categories-explore.component.html',
  styleUrls: ['./categories-explore.component.scss']
})
export class CategoriesExploreComponent implements OnInit, OnDestroy{
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

  scrollToBookshelf(id: number): void {
    const element = document.getElementById(String(id));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getSliderTitle(key: string, counter: number) {
    return `${key} (${counter})`;
  }

  getHeaderRouteForCategory(id: number) {
    return `${EXPLORE_CATEGORIES_ROUTE}/${id}`;
  }

  getHeaderRouteForBookshelf(id: number) {
    return `${EXPLORE_BOOKSHELVES_ROUTE}/${id}`;
  }

  onTabRedirect(path: string) {
    const url = path === 'bookshelves' ? EXPLORE_BOOKSHELVES_ROUTE : EXPLORE_CATEGORIES_ROUTE;
    this.router.navigateByUrl(url);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategoryTitleClick(path: string) {
    this.router.navigate([path]).then();
  }

  onBookshelfTitleClick(path: string) {
    this.router.navigate([path]).then();
  }
}
