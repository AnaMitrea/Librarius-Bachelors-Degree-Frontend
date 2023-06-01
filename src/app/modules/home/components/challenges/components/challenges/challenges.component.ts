import {Component, OnInit} from '@angular/core';
import {ChallengeCategoryModel, TrophyChallengeModel} from "@app-modules/home/shared/models/trophy-challenge.model";
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {take} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {ActivatedRoute, Router} from "@angular/router";
import {UserStoreService} from "@app-store/services/user-store.service";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  protected readonly Object = Object;
  joined: number[] = [];

  challenges: ChallengeCategoryModel = {
    'Reading Books': {
      htmlId: 'reading-books-div',
      trophies: []
    },
    'Reading Time': {
      htmlId: 'reading-time-div',
      trophies: []
    },
    'Category Reader': {
      htmlId: 'category-reader-div',
      trophies: []
    },
    'Activities': {
      htmlId: 'activities-div',
      trophies: []
    }
  };

  constructor(
    private trophyService: TrophyService,
    private userStoreService: UserStoreService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  initSubscriptions() {
    Object.keys(this.challenges).forEach((category: string) => {

      this.trophyService.getTrophiesByCategory(category, true).pipe(
        take(1)
      ).subscribe((data: ApiResponseModel<TrophyChallengeModel[]>)=> {
        if (data.result) {
          this.challenges[category].trophies = data.result.map((trophy: TrophyChallengeModel) => {
            if (!this.userStoreService.userEarnedTrophies[category]) {
              trophy.isWon = false;
            }
            else if (this.userStoreService.userEarnedTrophies[category].some((item: TrophyChallengeModel) => item.id === trophy.id)) {
              trophy.isWon = true;
            }

            return trophy;
          });
        } else {
          this.challenges[category].trophies = [];
        }
      });

      this.trophyService.getUserInProgressTrophiesByCategory(category)
        .pipe(take(1))
        .subscribe((data: ApiResponseModel<TrophyChallengeModel[]>) => {
          if (data) {
            const newIds = data.result.map(item => item.id);
            this.joined = this.joined.concat(newIds.filter(id => !this.joined.includes(id)));
          }
        });
    });
  }

  onChipClickScroll(divId: string) {
    const element = document.getElementById(divId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onClickSeeMore(categoryTitle: string) {
    this.router.navigate([categoryTitle], {relativeTo: this.route});
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
