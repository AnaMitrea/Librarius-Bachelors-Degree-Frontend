import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserStoreService} from "@app-store/services/user-store.service";
import {UserService} from "@app-shared/services/app/user/user.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {UserAppModel} from "@app-shared/models/user-app.model";
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private trophyService: TrophyService,
    private sharedUserStoreService: UserStoreService,
    private userAppService: UserService) {
  }

  ngOnInit(): void {
    // if (this.sharedUserStoreService.isDataFetched === false) {
    //   this.initUserSubscription();
    // }
// TODO remove this !!!
    this.initUserSubscription();
  }

  initUserSubscription() {
    this.userAppService.getUserInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<UserAppModel>) => {
        if(data) {
          this.sharedUserStoreService.setUserInformation(data.result)
        }
      });

    this.userAppService.getUserBooksReadingTracker()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<UserAppModel>) => {
        if(data) {
          this.sharedUserStoreService.updateReadingTimeForBook(data.result)
        }
      });

    this.trophyService.getUserCompletedTrophies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>)=> {
        const earnedTrophies = data.result ?? {};
        this.sharedUserStoreService.setEarnedTrophies(earnedTrophies);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
