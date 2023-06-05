import { Injectable } from '@angular/core';
import {HttpClient, HttpContext, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CACHE_REQUEST} from "@app-core/interceptor/cache-request-interceptor/tokens";
import {HttpServiceBaseService} from "@app-core/domain/http-service-base.service";
import {Utils as U} from "@app-utils/lodash/utils";
import {API_URL} from "@app-core/constants";
import {
  LIBRARY_BOOK_ROUTE, LIBRARY_ROUTE,
  USER_AUTHORS_ROUTE,
  USER_DASHBOARD_CLUBS_ROUTE,
  USER_DASHBOARD_ROUTE,
  USER_DASHBOARD_TROPHY_ROUTE,
  USER_ROUTE,
  USER_STATISTICS_ROUTE,
  USER_FAVORITES_ROUTE
} from "@app-utils/constants";
import {USERNAME_OR_PASSWORD_INVALID} from "@app-core/constants/toaster-error-messages";
import {
  BookIdReadingTimeRequestDto,
  BookReadingTimeRequestDto,
  LikeReviewRequestDto,
  ReviewRequestDto,
  SendReviewRequestDto
} from "@app-shared/models/transfer/book-dto";
import {RegisterRequestDto} from "@app-modules/landing/shared/models";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpServiceBaseService {
  readonly API_LIBRARY_BASE_URL = `${API_URL}${LIBRARY_ROUTE}`;
  readonly API_LIBRARY_BOOK_BASE_URL = `${API_URL}${LIBRARY_BOOK_ROUTE}`;
  readonly API_TROPHY_BASE_URL = `${API_URL}/trophy`;

  readonly cacheOptions = {
    context: new HttpContext().set(CACHE_REQUEST, true)
  };

  constructor(
    private http: HttpClient,
    private toasterService: ToastrService
  ) {
    super();
  }

  private handleHttpError() {
    return catchError((error) => throwError(() => this.handleCodesError(error)));
  }

  private handleErrorForToaster(
    message = 'Oops, something went wrong.',
    title = 'Error',
    override = { positionClass: 'toast-bottom-left' })
  {
    return catchError((httpErr) => {
      const httpError = U.path(['error', 'errors'], httpErr);
      if (httpErr.status === 500) {
        message = "Internal Server Error. Please try again later!";
      } if (httpErr.status === 0) {
        message = "Server connection error. Please try again later!";
      } else {
        message = httpError && httpError.length ? httpError[0].message : message;
      }

      this.toasterService.error(message, title, override);
      return of(null);
    });
  }

  private handleAndRethrowErrorForToaster(
    message = 'Oops, something went wrong.',
    title = 'Error',
    override = { positionClass: 'toast-bottom-left' })
  {
    return catchError((httpErr) => {
      const httpError = U.path(['error', 'errors'], httpErr);
      message = httpError && httpError.length ? httpError[0].message : message;

      this.toasterService.error(message, title, override);
      return throwError(httpError);
    });
  }

  // --- LANDING ---
  getUserLoggedIn(body: any): Observable<any> {
    return this.http.put(`${API_URL}/account/login`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster(USERNAME_OR_PASSWORD_INVALID)
    );
  }

  registerUser(body: RegisterRequestDto): Observable<any> {
    return this.http.post(`${API_URL}/account/register`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // --- HOME ---
  getReadingFeedBooks(): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/user/reading-feed`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // -> EXPLORE
  // http://localhost:5164/api/library/bookshelf
  getBookshelves(): Observable<any> {
    return this.http.get(`${API_URL}/library/bookshelf`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookshelfBooks(maxResults?: number, title?: string): Observable<any> {
    if (maxResults) {
      if (title) {
        return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/bookshelves?maxResults=${maxResults}&title=${title}&books=true`).pipe(
          this.handleHttpError(),
          this.handleErrorForToaster()
        );
      }
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/bookshelves?maxResults=${maxResults}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }

    if (title) {
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/bookshelves?title=${title}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/bookshelves?books=true`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookshelfWithOrderedBooks(maxResults?: number, title?: string): Observable<any> {
    if (maxResults) {
      if (title) {
        return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/bookshelves?maxResults=${maxResults}&title=${title}&books=true`).pipe(
          this.handleHttpError(),
          this.handleErrorForToaster()
        );
      }
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/bookshelves?maxResults=${maxResults}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }

    if (title) {
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/bookshelves?title=${title}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/bookshelves?books=true`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookshelfNoBooks(title?: string): Observable<any> {
    if (title) {
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/bookshelves?&title=${title}&books=false`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/bookshelves?books=false`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getCategoriesBooks(maxResults?: number, title?: string): Observable<any> {
    if (maxResults) {
      if (title) {
        return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/categories?maxResults=${maxResults}&title=${title}&books=true`).pipe(
          this.handleHttpError(),
          this.handleErrorForToaster()
        );
      }
      //
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/categories?maxResults=${maxResults}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }

    if (title) {
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/categories?title=${title}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/categories?books=true`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getCategoriesBooksNoBooks(title?: string): Observable<any> {
    if (title) {
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/categories?&title=${title}&books=false`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/categories?books=false`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getCategoriesWithOrderedBooks(startFrom: string, maxResults?: number, title?: string): Observable<any> {
    if (maxResults) {
      if (title) {
        return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/categories?startFrom=${startFrom}&maxResults=${maxResults}&title=${title}&books=true`).pipe(
          this.handleHttpError(),
          this.handleErrorForToaster()
        );
      }
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/categories?startFrom=${startFrom}&maxResults=${maxResults}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }

    if (title) {
      return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/categories?startFrom=${startFrom}&title=${title}&books=true`).pipe(
        this.handleHttpError(),
        this.handleErrorForToaster()
      );
    }
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/ordered/categories?startFrom=${startFrom}&books=true`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/library/bookshelf/categories
  getCategoriesByBookshelf(): Observable<any> {
    return this.http.get(`${API_URL}/library/categories`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // -> CHALLENGES
  joinTrophyChallenge(id: number): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/join/${id}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  leaveTrophyChallenge(id: number): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/leave/${id}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/trophy/challenges?category=...&limit=...
  getTrophiesByCategory(category: string, limit = false): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/challenges?category=${category}&limit=${limit}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getUserCompletedTrophies(): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/user/completed`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getUserCompletedTrophiesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/user/completed?category=${category}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getUserInProgressTrophies(): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/user/in-progress`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getUserInProgressTrophiesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/user/in-progress?category=${category}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // -> LEADERBOARDS
  getAllUsersRankByMinutesDesc(): Observable<any> {
    return this.http.get(`${API_URL}/library/user/all/minutes-logged`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getAllUsersRankByNumberOfBooksDesc(): Observable<any> {
    return this.http.get(`${API_URL}/library/user/all/number-of-books`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getAllUsersRankByPointsDesc(): Observable<any> {
    return this.http.get(`${API_URL}/user/all/points`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // --- LIBRARY ---
  // READING TRACKER MINUTES SPENT
  getUserBooksReadingTracker(): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/user/reading-tracker`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // Author
  getAuthorInformation(authorId: number): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/author/${authorId}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }
  getAuthorBooks(authorId: number, sortingOption: number): Observable<any> {
    const body = {
      authorId,
      sortingOption
    };

    return this.http.post(`${this.API_LIBRARY_BASE_URL}/author/materials`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  setAuthorSubscription(authorId: number): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BASE_URL}/author/${authorId}/subscription`, {}).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getAuthorSubscriptionStatus(authorId: number): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/author/${authorId}/subscription/status`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookContent(id: string): Observable<any> {
    // TODO add this.cacheOptions for cached data response

    return this.http.get(`${this.API_LIBRARY_BOOK_BASE_URL}/read?id=${id}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  checkUserFinishedBook(id: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BOOK_BASE_URL}/${id}/check-reading-completed`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  markBookAsFinished(body: BookReadingTimeRequestDto): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/complete-reading`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookWordCount(id: string): Observable<any> {
    const body = {
      bookId: id
    };

    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/word-count`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookAverageReadingTime(id: string): Observable<any> {
    const body = {
      bookId: id
    };

    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/reading-time`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getUserReadingTimeSpentByBookId(body: BookIdReadingTimeRequestDto): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/time-spent`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  updateUserReadingTimeSpent(body: BookReadingTimeRequestDto): Observable<any> {
    return this.http.put(`${this.API_LIBRARY_BOOK_BASE_URL}/time-spent/update`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  searchBooksAndAuthorsByFilter(body: any): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BASE_URL}/searchbar`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }


  getBookData(id: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BOOK_BASE_URL}/${id}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getBookReviews(body: ReviewRequestDto): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/reviews`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  updateReviewLike(body: LikeReviewRequestDto): Observable<any> {
    return this.http.put(`${this.API_LIBRARY_BOOK_BASE_URL}/reviews/like`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  setUserReview(body: SendReviewRequestDto): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/reviews/submit`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  removeUserReview(reviewId: number): Observable<any> {
    return this.http.delete(`${this.API_LIBRARY_BOOK_BASE_URL}/reviews/${reviewId}/remove`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getTrendingBooksForDuration(duration: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BOOK_BASE_URL}/trending?duration=${duration}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  toggleFavoriteBookForUser(body: any): Observable<any> {
    return this.http.post(`${this.API_LIBRARY_BOOK_BASE_URL}/favorite/toggle`, body).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // --- USER ---
  // http://localhost:5164/api/user/information
  getUserInformation(): Observable<any> {
    return this.http.get(`${API_URL}${USER_ROUTE}/information`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  getUserInProgressBooks(): Observable<any> {
    return this.http.get(`${API_URL}${LIBRARY_ROUTE}/user/reading/in-progress`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/user/dashboard/activity
  getUserActivity(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/activity`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/user/dashboard/overview/books
  getUserOverviewBooks(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/overview/books`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/user/dashboard/clubs
  getUserClubs(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_CLUBS_ROUTE}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/user/favorites
  getUserFavorites(): Observable<any> {
    return this.http.get(`${API_URL}${USER_FAVORITES_ROUTE}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/user/authors
  getUserAuthors(): Observable<any> {
    return this.http.get(`${API_URL}${USER_AUTHORS_ROUTE}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }

  // http://localhost:5164/api/user/statistics
  getUserStatistics(): Observable<any> {
    return this.http.get(`${API_URL}${USER_STATISTICS_ROUTE}`).pipe(
      this.handleHttpError(),
      this.handleErrorForToaster()
    );
  }
}
