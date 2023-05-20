import { Component, Input } from '@angular/core';
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
  @Input() headerTitle: string = '';
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
      }
    },
    nav: true
  }

  constructor(private router: Router) { }

  redirectToBookUrl(id: string) {
    this.router.navigate([LIBRARY_BOOK_ROUTE, id]).then();
  }

  onAuthorClick(id: number) {
    this.router.navigate([LIBRARY_AUTHOR_ROUTE, id]).then();
  }

  processName(author: string): string {
    return processAuthorName(author);
  }
}
