import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EXPLORE_BOOKSHELVES_ROUTE, EXPLORE_CATEGORIES_ROUTE} from "@app-utils/constants";
import {take} from "rxjs";
import {ExploreService} from "@app-modules/home/services/explore/explore.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {ExploreCarouselBookshelfBooksDto} from "@app-modules/home/shared/models/explore.dto";

@Component({
  selector: 'app-bookshelves-explore-container',
  templateUrl: './bookshelves-explore-container.component.html',
  styleUrls: ['./bookshelves-explore-container.component.scss']
})
export class BookshelvesExploreContainerComponent implements OnInit{
  bookshelves!: ExploreCarouselBookshelfBooksDto;

  constructor(
    private router: Router,
    private exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.exploreService.getBookshelfNoBooks()
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) this.bookshelves = data.result;
      });
  }

  scrollToBookshelf(key: string, id: number): void {
    const element = document.getElementById(String(id));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    else {
      this.router.navigate([EXPLORE_BOOKSHELVES_ROUTE, `${key}`]);
    }
  }

  getBookshelfKeys(): string[] {
    return Object.keys(this.bookshelves);
  }

  onTabRedirect(path: string) {
    const url = path === 'bookshelves' ? EXPLORE_BOOKSHELVES_ROUTE : EXPLORE_CATEGORIES_ROUTE;
    this.router.navigateByUrl(url);
  }
}
