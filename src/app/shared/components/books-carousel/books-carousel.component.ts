import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import {Book} from "@app-modules/home/shared/models";
import {LIBRARY_AUTHOR_ROUTE, LIBRARY_BOOK_ROUTE} from "@app-utils/constants";
import {processAuthorName} from "@app-utils/data-transformers";

@Component({
  selector: 'app-books-carousel',
  templateUrl: './books-carousel.component.html',
  styleUrls: ['./books-carousel.component.scss']
})
export class BooksCarouselComponent {
  @Input() booksSlides: Book[] = [];
  @Input() headerTitle: string | undefined;
  @Input() headerRoute: string = '';
  @Input() clickableHeaderTitle = false;
  @Input() showTopNumbers = true;

  customOptions: OwlOptions = {
    loop: false,
    lazyLoad:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      },
      1300: {
        items: 5
      },
      1400: {
        items: 6
      }
    },
    nav: true
  }

  constructor(private router: Router, private location: Location) { }

  onHeaderClick() {
    if (!this.clickableHeaderTitle) return;

    this.router.navigate([this.headerRoute]).then();
  }

  redirectToBookUrl(id: string) {
    this.router.navigate([LIBRARY_BOOK_ROUTE, id]).then();
  }

  onAuthorClick(id: number) {
    const url = this.router.createUrlTree([LIBRARY_AUTHOR_ROUTE, id]);
    const fullUrl = this.location.prepareExternalUrl(url.toString());
    window.open(fullUrl, '_blank');
  }

  processName(author: string): string {
    return processAuthorName(author);
  }
}
