import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ExploreCarouselBookshelfBooksDto} from "@app-modules/home/shared/models/explore.dto";
import {Router} from "@angular/router";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {EXPLORE_BOOKSHELVES_ROUTE} from "@app-utils/constants";
import {mapBooks} from "@app-modules/home/components/explore/components/bookshelves-explore-container/utils";

@Component({
  selector: 'app-preview-bookshelf-explore',
  templateUrl: './preview-bookshelf-explore.component.html',
  styleUrls: ['./preview-bookshelf-explore.component.scss']
})
export class PreviewBookshelfExploreComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bookshelves!: ExploreCarouselBookshelfBooksDto;
  maxResults = 10;

  constructor(
    private router: Router,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.exploreService.getBookshelvesBooks(this.maxResults)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        this.bookshelves = mapBooks(data.result);
      });
  }

  getSliderTitle(key: string, counter: number) {
    return `${key} (${counter})`;
  }

  getHeaderRouteForBookshelf(key: string) {
    return `${EXPLORE_BOOKSHELVES_ROUTE}/${key}`;
  }

  getBookshelfKeys(): string[] {
    return Object.keys(this.bookshelves);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
