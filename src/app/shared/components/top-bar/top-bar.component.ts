import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Router } from "@angular/router";
import {
  CHALLENGES_ROUTE,
  EXPLORE_ROUTE,
  HOME_ROUTE,
  LANDING_ROUTE,
  LEADERBOARDS_ROUTE,
  LIBRARY_AUTHOR_ROUTE,
  LIBRARY_BOOK_ROUTE,
  USER_ROUTE
} from "@app-utils/constants";
import {AuthService} from "@app-modules/landing/shared/services/auth/auth.service";
import {UserStoreService} from "@app-store/services/user-store.service";
import {FormControl} from "@angular/forms";
import {Observable, take} from "rxjs";
import {API_GUTENBERG_URL} from "@app-core/constants";
import {BookService} from "@app-modules/library/services/book/book.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

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
  protected readonly LEADERBOARDS_ROUTE = LEADERBOARDS_ROUTE;

  private isFullscreen = false;

  searchCtrl = new FormControl('');
  filteredOptions!: Observable<any>;


  constructor(
    private router: Router,
    private authService: AuthService,
    private sharedUserService: UserStoreService,
    private booksService: BookService
  ) {}

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

  onProfileClick() {
    this.router.navigate([USER_ROUTE]);
  }

  onLogoutCLick() {
    this.sharedUserService.resetStoreState({});
    this.authService.logout();

    this.router.navigate([LANDING_ROUTE]);
  }

  onClickItemNavigate(path: string) {
    this.router.navigateByUrl(path);
  }

  filterOnEnter(event: KeyboardEvent) {
    if (event.code === 'Enter' && this.searchCtrl.value) {
      this.filteredOptions = this.booksService.searchBooksAndAuthorsByFilter(this.searchCtrl.value)
        .pipe(take(1));
    }
  }

  getImageUrl(url: any, type: string): string {
    if (type === 'Author')
      return 'assets/author/author-profile.svg';
    return `${API_GUTENBERG_URL}${url}`;
  }

  selected(event: MatAutocompleteSelectedEvent) {
    const entityType = event.option.value.type;
    const entityId = event.option.value.id;
    console.log(event.option.value);
    console.log(entityId);
    console.log(entityType);

    this.searchCtrl.reset();

    if (entityType === 'Book')
      this.router.navigateByUrl(`${LIBRARY_BOOK_ROUTE}/${entityId}`)
        .then(() => {
        window.location.reload();
      });
    else
      this.router.navigateByUrl(`${LIBRARY_AUTHOR_ROUTE}/${entityId}`)
        .then(() => {
        window.location.reload();
      });
  }

  onSubmitPreventRefresh(event: Event) {
    event.preventDefault();
  }
}
