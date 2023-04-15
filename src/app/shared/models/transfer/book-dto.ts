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
  htmlAsSubmittedContentUrl: string;
  htmlContentUrl: string;
  htmlNoImagesContentUrl: string;
  plainTextContentUrl: string;
  link: string;
}

export interface BookContentDto {
  id: string;
  content: string;
}
