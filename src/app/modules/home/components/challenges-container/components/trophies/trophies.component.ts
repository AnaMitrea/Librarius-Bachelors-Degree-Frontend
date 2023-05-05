import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {TrophyChallengeModel} from "@app-modules/home/shared/models/trophy-challenge.model";
import {ActivatedRoute} from "@angular/router";
import {Utils as U} from "@app-utils/lodash/utils";
import {take} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'app-trophies',
  templateUrl: './trophies.component.html',
  styleUrls: ['./trophies.component.scss']
})
export class TrophiesComponent implements OnInit{
  trophies: TrophyChallengeModel[] = [];
  categoryTitle = '';

  joined: any[] = [];

  constructor(
    private trophyService: TrophyService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.url.subscribe(url => {
      this.categoryTitle = U.path(['path'], url[0]);
    }).unsubscribe();
  }

  ngOnInit(): void {
    this.trophyService.getTrophiesByCategory(this.categoryTitle, false).pipe(
      take(1)
    ).subscribe((data: ApiResponseModel)=> {
      this.trophies = data.result ?? [];
    });
  }

  onBackButton() {
    window.history.back();
  }

  isChallengeJoined(challengeId: number): boolean {
    // Add code to check whether the challenge with the given ID has been joined by the user
    // Return true if the challenge has been joined, false otherwise

    return this.joined.includes(challengeId);
  }

  isChallengeCompleted(challengeId: number) {
    return false;
  }

  buttonText(challengeId: number): string {
    const joined = this.isChallengeJoined(challengeId);
    return joined ? 'Challenge joined' : 'Join challenge';
  }

  private addChallengeId(challengeId: number) {
    // Add code to save the challenge ID here, e.g.:
    // this.challengeService.joinChallenge(this.challengeId);
    this.joined.push(challengeId);
  }

  private removeChallengeId(challengeId: number) {
    // Add code to remove the challenge ID here, e.g.:
    // this.challengeService.leaveChallenge(this.challengeId);
    this.joined.filter(id => id !== challengeId);
  }

  toggleJoinChallenge(challengeId: number) {
    const joined = this.isChallengeJoined(challengeId);
    if (joined) {
      this.removeChallengeId(challengeId);
    } else {
      this.addChallengeId(challengeId);
    }
  }
}
