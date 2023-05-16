import { Component, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import {Book} from "@app-modules/home/shared/models";

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
    this.router.navigate(['/library/book', id]).then();
  }
}