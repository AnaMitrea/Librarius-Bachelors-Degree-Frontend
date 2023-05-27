import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit{
  showScrollButton = false;


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.scrollY > 200;
  }

  constructor() {}

  ngOnInit(): void {
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
