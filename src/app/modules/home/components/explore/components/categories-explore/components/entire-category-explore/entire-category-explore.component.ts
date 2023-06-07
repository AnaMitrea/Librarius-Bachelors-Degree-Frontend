import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { OrderedExploreCategoryBooksDto } from '@app-modules/home/shared/models/explore.dto';
import {ActivatedRoute, Router} from '@angular/router';
import { ExploreService } from '@app-modules/home/services/explore/explore.service';
import { ApiResponseModel } from '@app-core/domain/model/api-response-model';
import {API_GUTENBERG_URL} from "@app-core/constants";
import {HOME_ROUTE, LIBRARY_BOOK_ROUTE} from "@app-utils/constants";

@Component({
  selector: 'app-entire-category-explore',
  templateUrl: './entire-category-explore.component.html',
  styleUrls: ['./entire-category-explore.component.scss'],
})
export class EntireCategoryExploreComponent implements OnInit{
  bookshelfCategories!: OrderedExploreCategoryBooksDto[];

  categoryTitle!: string;
  bookshelfTitle!: string;

  currentPage = 0;
  pageSize = 5;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let bookshelfTitle = params.get('bookshelfTitle');
      let categoryTitle = params.get('categoryTitle');
      if (bookshelfTitle && categoryTitle) {
        this.bookshelfTitle = bookshelfTitle;
        this.categoryTitle = categoryTitle;
        this.initSubscription('A', bookshelfTitle, categoryTitle);
      } else {
        this.router.navigate([HOME_ROUTE]);
      }
    });
  }

  initSubscription(startFrom: string, bookshelfTitle: string, categoryTitle: string, maxResults?: number) {
    this.exploreService
      .getCategoriesWithOrderedBooks(startFrom, bookshelfTitle, categoryTitle, maxResults)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<OrderedExploreCategoryBooksDto[]>) => {
        this.bookshelfCategories = data.result;
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;

    const startingLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const totalPages = Math.ceil(startingLetters.length / this.pageSize);
    const nextLetterIndex = (this.currentPage % totalPages) * this.pageSize;
    const nextStartingLetter = startingLetters.charAt(nextLetterIndex);

    this.initSubscription(nextStartingLetter, this.bookshelfTitle, this.categoryTitle);
  }

  redirectToBookUrl(id: string) {
    this.router.navigate([LIBRARY_BOOK_ROUTE, id]).then();
  }

  getCoverImageUrl(short_url: string) {
    return `${API_GUTENBERG_URL}${short_url}`;
  }

}
