import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {
  ExploreEntireBookshelfBooksDto
} from "@app-modules/home/shared/models/explore.dto";
import {ActivatedRoute, Router} from "@angular/router";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {HOME_ROUTE} from "@app-utils/constants";
import {API_GUTENBERG_URL} from "@app-core/constants";

@Component({
  selector: 'app-entire-bookshelf-explore',
  templateUrl: './entire-bookshelf-explore.component.html',
  styleUrls: ['./entire-bookshelf-explore.component.scss']
})
export class EntireBookshelfExploreComponent implements OnInit, OnDestroy  {
  private destroy$ = new Subject<void>();
  bookshelfTitle!: string;
  bookshelf!: ExploreEntireBookshelfBooksDto;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let title = params.get('title');
      if (title) {
        this.bookshelfTitle = title;
        this.initSubscription();
      } else {
        this.router.navigate([HOME_ROUTE]);
      }
    });
  }

  initSubscription() {
    this.exploreService.getBookshelvesWithOrderedBooks(undefined, this.bookshelfTitle)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.bookshelf = data.result;
        }
      });
  }

  redirectToBookUrl(id: string) {
    this.router.navigate(['/library/book', id]).then();
  }

  getCoverImageUrl(short_url: string) {
    return `${API_GUTENBERG_URL}${short_url}`;
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly Object = Object;
}
