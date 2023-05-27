import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import { EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE } from "@app-utils/constants";

@Component({
  selector: 'app-categories-explore',
  templateUrl: './categories-explore.component.html',
  styleUrls: ['./categories-explore.component.scss']
})
export class CategoriesExploreComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  categories: any;

  constructor(
    private router: Router,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.exploreService.getCategoriesByBookshelf().pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        this.categories = data.result;
        console.log(this.categories);
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
