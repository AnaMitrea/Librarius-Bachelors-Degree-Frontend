import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {UserStoreService} from "@app-store/services/user-store.service";
import {UserService} from "@app-shared/services/app/user/user.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {UserAppModel} from "@app-shared/models/user-app.model";

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private sharedUserStoreService: UserStoreService,
    private userAppService: UserService
  ) {}

  ngOnInit(): void {
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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
