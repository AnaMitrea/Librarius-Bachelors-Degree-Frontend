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

export interface BookContentDto {
  id: string;
  content: string;
}

export interface AuthorDto {
  id: number;
  name: string;
}



export interface ReadingTimeDto {
  hours: number;
  minutes: number;
  seconds: number;
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
  user: UserReviewerDto;
}

export interface LikeReviewRequestDto {
  ReviewID: number;
  isLiked: boolean;
}

export interface UserReviewerDto {
  id: number;
  username: string;
  nameInitial: string;
}
