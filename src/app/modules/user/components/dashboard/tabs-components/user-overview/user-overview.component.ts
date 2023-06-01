import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "@app-shared/services/app/user/user.service";
import {Subject, take, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Book} from "@app-modules/home/shared/models";
import {mapBookDtoToBook} from "@app-modules/home/components/home/shared/transformers";
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {TrophiesByCategoryModel}from "@app-modules/home/shared/models/trophy-challenge.model";

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  protected readonly Object = Object;

  booksInProgress!: Book[];
  trophiesInProgress!: TrophiesByCategoryModel;

  constructor(
    private router: Router,
    private userService: UserService,
    private trophyService: TrophyService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.initTrophiesSubscription();
    this.initBooksSubscription();
  }

  initTrophiesSubscription() {
    this.trophyService.getUserInProgressTrophies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.trophiesInProgress = data.result;
        }
      })
  }

  initBooksSubscription() {
    this.userService.getUserInProgressBooks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        if (data) {
          this.booksInProgress = data.result.map((book: Book, idx: number) => mapBookDtoToBook(book, idx));
        }
      })
  }

  leaveChallenge(id: number) {
    this.trophyService.leaveChallenge(id)
      .pipe(take(1))
      .subscribe((data:ApiResponseModel<boolean>) => {
        if (data) {
          this.initTrophiesSubscription();
        }
      });
  }

  hasEmptyData(data: any): boolean {
    if (Array.isArray(data) && data.length < 1) {
      return true;
    }
    if (typeof data === 'object' && Object.keys(data).length < 1) {
      return true;
    }

    return false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
