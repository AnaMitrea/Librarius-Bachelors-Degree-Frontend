import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {UserStoreService} from "@app-store/services/user-store.service";

@Component({
  selector: 'app-challenges-container',
  templateUrl: './challenges-container.component.html',
  styleUrls: ['./challenges-container.component.scss']
})
export class ChallengesContainerComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }

  constructor(
    private trophyService: TrophyService,
    private sharedUserStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.trophyService.getUserCompletedTrophies()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>)=> {
        const earnedTrophies = data.result ?? {};
        this.sharedUserStoreService.setEarnedTrophies(earnedTrophies);
      });
  }

  onClickScrollToTop(){
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
