
export interface UserReadingFeed {
  username: string;
  nameInitial: string;
  book: {
    id: number;
    url: string;
    title: string;
  }
}
