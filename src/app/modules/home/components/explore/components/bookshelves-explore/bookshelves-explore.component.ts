import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE} from "@app-utils/constants";
import {Subject, takeUntil} from "rxjs";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {BookshelfDto} from "@app-modules/home/shared/models/bookshelf.dto";

@Component({
  selector: 'app-bookshelves-explore',
  templateUrl: './bookshelves-explore.component.html',
  styleUrls: ['./bookshelves-explore.component.scss']
})
export class BookshelvesExploreComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  bookshelves!: BookshelfDto[];

  constructor(
    private router: Router,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.exploreService.getBookshelves().pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        console.log(data);
        this.bookshelves = data.result;
        console.log(this.bookshelves)
      });
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
