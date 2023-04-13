import { BookTrendingDTO } from '../../../models';
import { Utils as U } from '@app-utils/index';
import { API_GUTENBERG_URL } from '../../../../../core';

export const mapBookDtoToBook = (dto: BookTrendingDTO, idx: number) => {
  return {
    id: U.path(['id'], dto),
    position: `assets/home/top/top-material-${idx + 1}.png`,
    src: `${API_GUTENBERG_URL}${U.path(['coverImageUrl'], dto)}`,
    alt: "book",
    title: U.path(['title'], dto),
    author: U.path(['author'], dto)
  }
};
