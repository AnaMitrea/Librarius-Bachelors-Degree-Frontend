import {
  ExploreCarouselBookshelfBooksDto,
  ExploreEntireBookshelfBooksDto, OrderedAlphabeticallyBooksDto
} from "@app-modules/home/shared/models/explore.dto";
import {Book} from "@app-modules/home/shared/models";
import {mapBookDtoToBook} from "@app-modules/home/components/home/shared/transformers";

export const mapBooks = (bookshelves: any): ExploreCarouselBookshelfBooksDto => {
  for (const key in bookshelves) {
    if (bookshelves.hasOwnProperty(key)) {
      const bookshelf = bookshelves[key];
      bookshelves[key].books = bookshelf.books.map((book: Book, idx: number) => mapBookDtoToBook(book, idx));
    }
  }

  return bookshelves;
}

