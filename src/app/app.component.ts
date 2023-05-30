import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserStoreService} from "@app-shared/services/store/user-store.service";
import {UserAppService} from "@app-shared/services/app/user/user-app.service";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {UserAppModel} from "@app-shared/models/user-app.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  title = 'Librarius';

  constructor(
    private sharedUserStoreService: UserStoreService,
    private userAppService: UserAppService
  ) {}

  ngOnInit(): void {
    this.userAppService.getUserInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<UserAppModel>) => {
        if(data) {
          this.sharedUserStoreService.setUserInformation(data.result)
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
