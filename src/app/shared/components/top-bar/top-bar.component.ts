import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnChanges {
  @Input() hasSideNavBar!: boolean;
  @Input() hasFullscreenMode!: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.hasSideNavBar = changes['hasSideNavBar'].currentValue ? changes['hasSideNavBar'].currentValue : false;
    this.hasFullscreenMode = changes['hasFullscreenMode'].currentValue ? changes['hasFullscreenMode'].currentValue : false;
  }

  ngOnInit(): void {
    this.hasSideNavBar = this.hasSideNavBar ? this.hasSideNavBar : false;
    this.hasFullscreenMode = this.hasFullscreenMode ? this.hasFullscreenMode : false;
  }

  toggleFullscreen() {

  }

  openNotifications() {

  }

  openMenu() {

  }
}
