import {AuthorDto} from "@app-shared/models/transfer/book-dto";

export interface Book {
  id: string,
  position: string,
  src: string,
  alt: string,
  title: string,
  author: AuthorDto
}
