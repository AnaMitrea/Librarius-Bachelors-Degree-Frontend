import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthorService} from "@app-modules/library/services/author/author.service";
import {API_GUTENBERG_URL} from "@app-core/constants";
import {BookDto} from "@app-shared/models/transfer/book-dto";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, OnDestroy{
  bookData!: BookDto;

  constructor(
    private authorService: AuthorService
  ) {}

  ngOnInit(): void {
  }

  getCoverImageUrl() {
    return `${API_GUTENBERG_URL}${this.bookData.coverImageUrl}`;
  }

  onClickOrderBy(number: number) {

  }

  ngOnDestroy(): void {
  }
}
