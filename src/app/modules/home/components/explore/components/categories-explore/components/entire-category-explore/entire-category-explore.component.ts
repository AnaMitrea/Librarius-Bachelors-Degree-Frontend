import { Component, OnDestroy, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { OrderedExploreCategoryBooksDto } from '@app-modules/home/shared/models/explore.dto';
import { Router } from '@angular/router';
import { ExploreService } from '@app-modules/home/services/explore/explore.service';
import { ApiResponseModel } from '@app-core/domain/model/api-response-model';
import {API_GUTENBERG_URL} from "@app-core/constants";

@Component({
  selector: 'app-entire-category-explore',
  templateUrl: './entire-category-explore.component.html',
  styleUrls: ['./entire-category-explore.component.scss'],
})
export class EntireCategoryExploreComponent implements OnInit, OnDestroy {
  bookshelfCategories!: OrderedExploreCategoryBooksDto[];

  maxResults = 10;
  currentPage = 0;
  pageSize = 10;

  constructor(private router: Router, private exploreService: ExploreService) {}

  ngOnInit(): void {
    this.initSubscription('A');
  }

  ngOnDestroy(): void {
    // Unsubscribe from any subscriptions to avoid memory leaks
  }

  initSubscription(startFrom: string) {
    this.exploreService
      .getCategoriesWithOrderedBooks(startFrom)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        this.bookshelfCategories = data.result;
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
  }

  redirectToBookUrl(id: string) {
    this.router.navigate(['/library/book', id]).then();
  }

  getCoverImageUrl(short_url: string) {
    return `${API_GUTENBERG_URL}${short_url}`;
  }

}
