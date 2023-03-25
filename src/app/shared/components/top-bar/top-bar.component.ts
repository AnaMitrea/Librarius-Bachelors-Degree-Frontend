import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnChanges {
  @Input() hasSideNavBar!: boolean;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.hasSideNavBar = changes['hasSideNavBar'].currentValue ? changes['hasSideNavBar'].currentValue : false;
  }

  ngOnInit(): void {
    this.hasSideNavBar = this.hasSideNavBar ? this.hasSideNavBar : false;
  }

  toggleFullscreen() {

  }

  openNotifications() {

  }

  openMenu() {

  }
}
