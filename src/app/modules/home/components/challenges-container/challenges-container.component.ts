import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-challenges-container',
  templateUrl: './challenges-container.component.html',
  styleUrls: ['./challenges-container.component.scss']
})
export class ChallengesContainerComponent {
  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
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
