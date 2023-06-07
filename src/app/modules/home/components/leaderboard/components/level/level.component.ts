import {Component, OnDestroy, OnInit} from '@angular/core';
import {Level, UserStats} from "@app-modules/home/components/leaderboard/models/level.dto";
import {LevelAssignService} from "@app-modules/home/components/leaderboard/services/level/level-assign.service";
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {UserStoreService} from "@app-store/services/user-store.service";

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();

  userStats!: UserStats;

  levels!: Level[];

  constructor(
    private levelService: LevelAssignService,
    private storeService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.userStats = this.storeService.stats;
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.levelService.getLevelsOrderedAsc(true)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<Level[]>) => {
        if (data) {
          this.levels = data.result;
        }
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


