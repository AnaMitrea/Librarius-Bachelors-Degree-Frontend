import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserWishlistService} from "@app-modules/user/services/wishlist/user-wishlist.service";
import {Subject, take, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Book} from "@app-modules/home/shared/models";
import {mapBookDtoToBook} from "@app-modules/home/components/home/shared/transformers";
import {Router} from "@angular/router";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  books!: Book[];

  constructor(
    private userWishlistService: UserWishlistService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initSubscription();
  }

  initSubscription() {
    this.userWishlistService.getUserFavoriteBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.books = this.mapBooks(data.result);
        }
      });
  }

  mapBooks(booksData: any[]): Book[] {
    return booksData.map((book, idx) => mapBookDtoToBook(book, idx));
  }

  redirectToBookUrl(id: string) {
    this.router.navigate(['/library/book', id]).then();
  }

  removeFromFavorite(id: string) {
    this.userWishlistService.removeUserFavoriteBook(id)
      .pipe(take(1))
      .subscribe();
    this.userWishlistService.getUserFavoriteBooks()
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.books = this.mapBooks(data.result);
        }
      });
  }

  getBooksNumber() {
    return this.books.length;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
