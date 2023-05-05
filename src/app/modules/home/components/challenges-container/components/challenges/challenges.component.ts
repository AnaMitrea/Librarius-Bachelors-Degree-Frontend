import {Component, OnInit} from '@angular/core';
import {ChallengeCategoryModel} from "@app-modules/home/shared/models/trophy-challenge.model";
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {take} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  protected readonly Object = Object;

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
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    Object.keys(this.challenges).forEach((category: string) => {
      this.trophyService.getTrophiesByCategory(category, true).pipe(
        take(1)
      ).subscribe((data: ApiResponseModel)=> {
        this.challenges[category].trophies = data.result ?? [];
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

  onJoinChallengeClick(id: number) {
    // TODO save clicked challenge
  }
}
