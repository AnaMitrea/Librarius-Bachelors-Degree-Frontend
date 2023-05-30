import {Utils as U} from "@app-utils/lodash/utils";
import {LIBRARY_BOOK_ROUTE} from "@app-utils/constants";

export const mapUserDtoToReadingFeedUser = (dto: any) => {
  const result = {
    username: U.path(['username'], dto),
    nameInitial:  U.path(['nameInitial'], dto),
    book: {
      id: U.path(['book', 'id'], dto),
      title: U.path(['book', 'title'], dto),
      url: `${LIBRARY_BOOK_ROUTE}/${U.path(['book', 'id'], dto)}`
    }
  }
  debugger
  return result;
};
