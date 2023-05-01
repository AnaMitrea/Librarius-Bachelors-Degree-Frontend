import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";
import {
  CHALLENGES_ROUTE,
  EXPLORE_ROUTE,
  HOME_ROUTE,
  LANDING_ROUTE,
  USER_ROUTE,
  USER_SETTINGS_ROUTE
} from "@app-utils/constants";
import {AuthService} from "@app-modules/landing/shared/services/auth.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit, OnChanges {
  @Input() hasSideNavBar!: boolean;
  @Input() hasFullscreenMode!: boolean;

  protected readonly HOME_ROUTE = HOME_ROUTE;
  protected readonly EXPLORE_ROUTE = EXPLORE_ROUTE;
  protected readonly CHALLENGES_ROUTE = CHALLENGES_ROUTE;
  private isFullscreen = false;

  constructor(private router: Router, private authService: AuthService) {}

  @HostListener('document:fullscreenchange', ['$event'])
  onFullscreenChange(event: Event) {
    this.isFullscreen = !!document.fullscreenElement;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'F11') {
      event.preventDefault();
      this.toggleFullscreen();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.hasSideNavBar = changes['hasSideNavBar'].currentValue ? changes['hasSideNavBar'].currentValue : false;
    this.hasFullscreenMode = changes['hasFullscreenMode'].currentValue ? changes['hasFullscreenMode'].currentValue : false;
  }

  ngOnInit(): void {
    this.hasSideNavBar = this.hasSideNavBar ? this.hasSideNavBar : false;
    this.hasFullscreenMode = this.hasFullscreenMode ? this.hasFullscreenMode : false;
  }

  toggleFullscreen() {
    if (this.isFullscreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  openNotifications() {

  }

  onProfileClick() {
    this.router.navigate([USER_ROUTE]);
  }

  onSettingsClick() {
    this.router.navigate([USER_SETTINGS_ROUTE]);
  }

  onLogoutCLick() {
    this.authService.logout();
    this.router.navigate([LANDING_ROUTE]);
  }

  onClickItemNavigate(path: string) {
    this.router.navigateByUrl(path);
  }
}
