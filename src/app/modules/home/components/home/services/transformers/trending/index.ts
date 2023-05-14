import { Utils as U } from '@app-utils/index';
import { API_GUTENBERG_URL } from '@app-core/index';
import {BookTrendingDto} from "@app-modules/home/shared/models";

export const mapBookDtoToBook = (dto: BookTrendingDto, idx: number) => {
  return {
    id: U.path(['id'], dto),
    position: `assets/home/top/top-material-${idx + 1}.png`,
    src: `${API_GUTENBERG_URL}${U.path(['coverImageUrl'], dto)}`,
    alt: "book",
    title: U.path(['title'], dto),
    author: U.path(['author'], dto)
  }
};
