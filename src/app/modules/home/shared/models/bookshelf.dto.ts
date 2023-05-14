import {Book} from "@app-modules/home/shared/models/book-item-carousel.model";

export interface BookshelfDto {
  id: number;
  title: string;
  books: Book[];
}
