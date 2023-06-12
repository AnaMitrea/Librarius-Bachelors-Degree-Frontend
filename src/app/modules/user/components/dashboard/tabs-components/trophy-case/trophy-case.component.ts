import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TrophiesByCategoryModel} from "@app-modules/home/shared/models/trophy-challenge.model";
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'app-trophy-case',
  templateUrl: './trophy-case.component.html',
  styleUrls: ['./trophy-case.component.scss']
})
export class TrophyCaseComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  protected readonly Object = Object;

  trophiesFinished!: TrophiesByCategoryModel;

  constructor(
    public router: Router,
    private trophyService: TrophyService
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.initTrophiesSubscription();
  }

  initTrophiesSubscription() {
    this.trophyService.getUserCompletedTrophies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<TrophiesByCategoryModel>) => {
        if (data) {
          this.trophiesFinished = data.result;
        }
      })
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
