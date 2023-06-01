import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { INavbarConfig, navbarConfig } from './models';
import { Router } from '@angular/router';
import {UserStoreService} from "@app-store/services/user-store.service";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('100ms',
          style({opacity: 0})
        )
      ])
    ])
  ]
})
export class SideNavbarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  navData: INavbarConfig[];
  collapsed = false;
  screenWidth = 0;

  userName!: string;
  userLevel!: string;
  userPoints!: number;

  constructor(
    private router: Router,
    private userStoreService: UserStoreService
  ) {
    this.navData = navbarConfig;
    this.setUserData();
  }

  setUserData() {
    this.userName = this.userStoreService.username ?? '';
    this.userLevel = this.userStoreService.stats.level ?? '';
    this.userPoints = this.userStoreService.stats.points ?? 0;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  onClickItemNavigate(path: string) {
    this.router.navigateByUrl(`/user/${path}`).then();
  }
}
