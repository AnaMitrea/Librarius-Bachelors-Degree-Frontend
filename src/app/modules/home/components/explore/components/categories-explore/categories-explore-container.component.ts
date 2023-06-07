import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, take, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import { EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE } from "@app-utils/constants";
import {ExploreCategoryBooksDto} from "@app-modules/home/shared/models/explore.dto";
import {Book} from "@app-modules/home/shared/models";
import {mapBookDtoToBook} from "src/app/modules/home/components/home/shared/transformers";

@Component({
  selector: 'app-categories-explore',
  templateUrl: './categories-explore-container.component.html',
  styleUrls: ['./categories-explore-container.component.scss']
})
export class CategoriesExploreContainerComponent implements OnInit{
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
    this.exploreService.getCategoriesWithNoBooks()
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        this.bookshelfCategories = data.result;
      });
  }

  scrollToBookshelf(bookshelfKey: string, key: string, id: number): void {
    const element = document.getElementById(String(id));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }  else {
      this.router.navigate([EXPLORE_CATEGORIES_ROUTE, `${bookshelfKey}`, `${key}`]);
    }
  }

  onTabRedirect(path: string) {
    const url = path === 'bookshelves' ? EXPLORE_BOOKSHELVES_ROUTE : EXPLORE_CATEGORIES_ROUTE;
    this.router.navigateByUrl(url);
  }
}
