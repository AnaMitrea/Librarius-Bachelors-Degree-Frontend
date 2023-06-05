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
export class EntireCategoryExploreComponent implements OnInit{
  bookshelfCategories!: OrderedExploreCategoryBooksDto[];

  currentPage = 0;
  pageSize = 5;

  constructor(private router: Router, private exploreService: ExploreService) {}

  ngOnInit(): void {
    this.initSubscription('A');
  }

  initSubscription(startFrom: string) {
    this.exploreService
      .getCategoriesWithOrderedBooks(startFrom)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<OrderedExploreCategoryBooksDto[]>) => {
        this.bookshelfCategories = data.result;
      });
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;

    // Get the next starting letter based on the current page index
    // Paginator length = 6 -> maximum letter starts: A, F, K, P, U, Z
    const startingLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersPerPage = 5; // Number of letters displayed per page
    const totalPages = Math.ceil(startingLetters.length / lettersPerPage); // Total number of pages
    const nextLetterIndex = (this.currentPage % totalPages) * lettersPerPage;
    const nextStartingLetter = startingLetters.charAt(nextLetterIndex);

    this.initSubscription(nextStartingLetter);
  }

  redirectToBookUrl(id: string) {
    this.router.navigate(['/library/book', id]).then();
  }

  getCoverImageUrl(short_url: string) {
    return `${API_GUTENBERG_URL}${short_url}`;
  }

}
