type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export interface BookDto {
  id: string;
  author: string;
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

export interface ReviewRequestModel {
  BookId: string;
  MaxResults: number;
  SortBy: string;
  StartIndex: number;
}

export interface UserReviewer {
  id: number;
  username: string;
  nameInitial: string;
}

export interface ReviewResponseModel {
  id: number;
  content: string;
  likes: number;
  timeValue: string;
  timeUnit: string;
  user: UserReviewer;
}
