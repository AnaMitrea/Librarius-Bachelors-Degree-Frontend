export interface RankByMinutesElement {
  position: number;
  user: string;
  minutesLogged: number;
}

export interface RankByBooksElement {
  position: number;
  user: string;
  booksRead: number;
}

export interface RankByPointsElement {
  position: number;
  user: string;
  points: number;
}

export const MINUTES_ELEMENT_DATA: RankByMinutesElement[] = [
  {position: 1, user: 'User', minutesLogged: 142},
  {position: 2, user: 'User', minutesLogged: 120},
  {position: 3, user: 'User', minutesLogged: 111},
  {position: 4, user: 'User', minutesLogged: 110},
  {position: 5, user: 'User', minutesLogged: 99},
  {position: 6, user: 'User', minutesLogged: 95},
  {position: 7, user: 'User', minutesLogged: 78},
  {position: 8, user: 'User', minutesLogged: 56},
  {position: 9, user: 'User', minutesLogged: 40},
  {position: 10, user: 'User', minutesLogged: 39},
];

export const BOOKS_ELEMENT_DATA: RankByBooksElement[] = [
  {position: 1, user: 'Hydrogen', booksRead: 1.0079},
  {position: 2, user: 'Helium', booksRead: 4.0026},
  {position: 3, user: 'Lithium', booksRead: 6.941},
  {position: 4, user: 'Beryllium', booksRead: 9.0122},
  {position: 5, user: 'Boron', booksRead: 10.811},
  {position: 6, user: 'Carbon', booksRead: 12.0107},
  {position: 7, user: 'Nitrogen', booksRead: 14.0067},
  {position: 8, user: 'Oxygen', booksRead: 15.9994},
  {position: 9, user: 'Fluorine', booksRead: 18.9984},
  {position: 10, user: 'Neon', booksRead: 20.1797},
];

export const POINTS_ELEMENT_DATA: RankByPointsElement[] = [
  {position: 1, user: 'Hydrogen', points: 1.0079},
  {position: 2, user: 'Helium', points: 4.0026},
  {position: 3, user: 'Lithium', points: 6.941},
  {position: 4, user: 'Beryllium', points: 9.0122},
  {position: 5, user: 'Boron', points: 10.811},
  {position: 6, user: 'Carbon', points: 12.0107},
  {position: 7, user: 'Nitrogen', points: 14.0067},
  {position: 8, user: 'Oxygen', points: 15.9994},
  {position: 9, user: 'Fluorine', points: 18.9984},
  {position: 10, user: 'Neon', points: 20.1797},
];
