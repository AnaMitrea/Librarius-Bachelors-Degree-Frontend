import {Component, OnInit} from '@angular/core';
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {TrophyChallengeModel} from "@app-modules/home/shared/models/trophy-challenge.model";
import {ActivatedRoute} from "@angular/router";
import {Utils as U} from "@app-utils/lodash/utils";
import {take} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {UserStoreService} from "@app-store/services/user-store.service";

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.scss']
})
export class TrophiesComponent implements OnInit{
  trophies: TrophyChallengeModel[] = [];
  categoryTitle = '';
  joined: number[] = [];

  constructor(
    private trophyService: TrophyService,
    private userStoreService: UserStoreService,
    private route: ActivatedRoute
  ) {
    this.route.url.subscribe(url => {
      this.categoryTitle = U.path(['path'], url[0]);
    }).unsubscribe();
  }

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    this.trophyService.getTrophiesByCategory(this.categoryTitle, false)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<TrophyChallengeModel[]>)=> {
        if (data.result) {
          this.trophies = data.result.map((trophy: TrophyChallengeModel) => {
            if (!this.userStoreService.userEarnedTrophies[this.categoryTitle]) {
              trophy.isWon = false;
            }
            else if (this.userStoreService.userEarnedTrophies[this.categoryTitle].some((item: TrophyChallengeModel) => item.id === trophy.id)) {
              trophy.isWon = true;
            }

            return trophy;
          });
        } else {
          this.trophies = [];
        }
    });

    this.trophyService.getUserInProgressTrophiesByCategory(this.categoryTitle)
      .pipe(take(1))
      .subscribe((data: ApiResponseModel<TrophyChallengeModel[]>) => {
        if (data) {
          this.joined = data.result.map(item => item.id);
        }
      });
  }

  onBackButton() {
    window.history.back();
  }

  isChallengeJoined(challengeId: number): boolean {
    return this.joined.includes(challengeId);
  }

  private addChallengeId(challengeId: number) {

    this.trophyService.joinChallenge(challengeId)
      .pipe(take(1))
      .subscribe((data:ApiResponseModel<boolean>) => {
        if (data) {
          this.joined.push(challengeId);

          this.initSubscriptions();
        }
      });
  }

  private removeChallengeId(challengeId: number) {
    this.trophyService.leaveChallenge(challengeId)
      .pipe(take(1))
      .subscribe((data:ApiResponseModel<boolean>) => {
        if (data) {
          this.joined = this.joined.filter(id => id !== challengeId);

          this.initSubscriptions();
        }
      });
  }

  toggleJoinChallenge(challengeId: number) {
    if (this.isChallengeJoined(challengeId)) {
      this.removeChallengeId(challengeId);
    } else {
      this.addChallengeId(challengeId);
    }
  }
}
