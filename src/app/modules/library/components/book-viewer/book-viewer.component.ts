import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '@app-modules/library/services/book/book.service';
import { BookDto } from '@app-shared/models/transfer/book-dto';
import { API_GUTENBERG_URL } from '../../../../core';
import { LIBRARY_BOOK_ROUTE, READ } from '@app-utils/constants';
import {take} from "rxjs";

@Component({
  selector: 'app-book-viewer',
  templateUrl: './book-viewer.component.html',
  styleUrls: ['./book-viewer.component.scss']
})
export class BookViewerComponent implements OnInit {
  bookData!: BookDto;
  ratingValue = 4;
  maxStars = 5;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';
      this.bookService.getBookData(id).pipe(take(1)).subscribe(data => {
        this.bookData = data.result;
      })
    })
  }

  getCoverImageUrl() {
    return `${API_GUTENBERG_URL}${this.bookData.coverImageUrl}`;
  }

  onReadClick(id: string) {
    this.router.navigate([LIBRARY_BOOK_ROUTE, id, READ]);
  }
}
