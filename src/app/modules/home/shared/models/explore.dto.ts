import {Book} from "@app-modules/home/shared/models/book-item-carousel.model";

export interface BookshelfDto {
  id: number;
  title: string;
}


export interface ExploreBookshelfBooksDto {
  [title: string]: {
    id: number;
    books: Book[];
    totalBooks: number;
  }
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
