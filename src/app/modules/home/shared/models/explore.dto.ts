import {Book} from "@app-modules/home/shared/models/book-item-carousel.model";
import {BookDto} from "@app-shared/models/transfer/book-dto";

export interface ExploreCarouselBookshelfBooksDto {
  [title: string]: {
    id: number;
    books: Book[];
    totalBooks: number;
  }
}

export interface ExploreEntireBookshelfBooksDto {
  [title: string]: {
    id: number;
    books: OrderedAlphabeticallyBooksDto;
    totalBooks: number;
  }
}

export interface OrderedAlphabeticallyBooksDto {
  [letter: string]: BookDto[]
}

export interface ExploreCategoryBooksDto {
  bookshelfId: number;
  bookshelfTitle: string;
  categories: ExploreCategoryDto[]
}

export interface ExploreCategoryDto {
  id: number;
  title: string;
  totalBooks: number;
  books: Book[];
}


export interface OrderedExploreCategoryBooksDto {
  bookshelfId: number;
  bookshelfTitle: string;
  categories: OrderedExploreCategoryDto[]
}

export interface OrderedExploreCategoryDto {
  id: number;
  title: string;
  totalBooks: number;
  books: OrderedAlphabeticallyBooksDto;
}
