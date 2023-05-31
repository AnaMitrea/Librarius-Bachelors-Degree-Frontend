type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface BookDto {
  id: string;
  author: AuthorDto;
  title: string;
  releaseDate: string;
  language: string;
  bookCategories: any;
  coverImageUrl: string;
  htmlContentUrl: string;
  link: string;
}

export interface MinimalBookDto {
  id: string;
  author: AuthorDto;
  title: string;
  coverImageUrl: string;
  link: string;
}

export interface CompletedBookRequestDto {
  bookId: string;
  timeSpent: number;
}

export interface BookContentDto {
  id: string;
  content: string;
}

export interface AuthorDto {
  id: number;
  name: string;
}

export interface Material {
  title: string;
  books: BookDto[],
  count: number
}

export interface ReadingTimeDto {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface BookIdReadingTimeRequestDto {
  bookId: number;
}

export interface BookReadingTimeRequestDto {
  bookId: number;
  timeSpent: number;
}

export interface ReviewRequestDto {
  BookId: string;
  MaxResults: number;
  SortBy: string;
  StartIndex: number;
}

export interface ReviewResponseDto {
  id: number;
  content: string;
  likes: number;
  liked: boolean;
  timeValue: string;
  timeUnit: string;
  rating: number;
  isMyReview: boolean;
  user: UserReviewerDto;
}

export interface LikeReviewRequestDto {
  ReviewID: number;
  isLiked: boolean;
}

export interface SendReviewRequestDto {
  reviewContent: string;
  bookId: number;
  rating: number;
}

export interface UserReviewerDto {
  id: number;
  username: string;
  nameInitial: string;
}
