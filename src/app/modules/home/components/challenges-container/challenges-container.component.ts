import {Component, HostListener, OnInit} from '@angular/core';
import {TrophyService} from "@app-modules/home/services/trophy/trophy.service";
import {take} from "rxjs";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";

@Component({
  selector: 'app-challenges-container',
  templateUrl: './challenges-container.component.html',
  styleUrls: ['./challenges-container.component.scss']
})
export class ChallengesContainerComponent implements OnInit{
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }

  constructor(private trophyService: TrophyService) {}

  ngOnInit(): void {
    this.trophyService.getUserCompletedTrophies().pipe(
      take(1)
    ).subscribe((data: ApiResponseModel)=> {
      console.log(data.result)
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
}
