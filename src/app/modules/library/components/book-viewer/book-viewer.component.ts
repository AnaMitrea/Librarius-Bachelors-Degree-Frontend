import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '@app-modules/library/services/book/book.service';
import { BookDto } from '../../../../shared/models/transfer/book-dto';
import { API_GUTENBERG_URL } from '../../../../core';

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
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') ?? '';
      this.bookService.getBookData(id).subscribe(data => {
        this.bookData = data.result;
      })
    })
  }

  getCoverImageUrl() {
    return `${API_GUTENBERG_URL}${this.bookData.coverImageUrl}`;
  }
}
