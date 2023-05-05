import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CACHE_REQUEST} from "@app-core/interceptor/cache-request-interceptor/tokens";
import {HttpServiceBaseService} from "@app-core/domain/http-service-base.service";
import {Utils as U} from "@app-utils/lodash/utils";
import {API_URL} from "@app-core/constants";
import {
  LIBRARY_BOOK_ROUTE,
  USER_AUTHORS_ROUTE,
  USER_DASHBOARD_CLUBS_ROUTE,
  USER_DASHBOARD_ROUTE,
  USER_DASHBOARD_TROPHY_ROUTE,
  USER_ROUTE,
  USER_STATISTICS_ROUTE,
  USER_WISHLIST_ROUTE
} from "@app-utils/constants";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpServiceBaseService {
  readonly API_LIBRARY_BASE_URL = `${API_URL}${LIBRARY_BOOK_ROUTE}`;
  readonly API_TROPHY_BASE_URL = `${API_URL}/trophy`;

  constructor(
    private http: HttpClient,
    private toasterService: ToastrService
  ) {
    super();
  }

  private handleHttpError() {
    return catchError((error) => throwError(() => this.handleError(error)));
  }

  private handleErrorForToaster(
    message = 'Oops, something went wrong.',
    title = 'Error',
    override = { positionClass: 'toast-bottom-left' })
  {
    return catchError((httpErr) => {
      const httpError = U.path(['error', 'errors'], httpErr);
      message = httpError.length ? httpError[0].message : message;

      this.toasterService.error(message, title, override);
      return of(null);
    });
  }

  // --- LANDING ---
  getUserLoggedIn(body: any): Observable<any> {
    return this.http.put(`${API_URL}/account/login`, body).pipe(
      this.handleHttpError(),
       this.handleErrorForToaster('Username or password invalid.')
    );
  }

  // --- HOME ---
  // -> CHALLENGES

  // http://localhost:5164/api/trophy/challenges?category=...&limit=...
  getTrophiesByCategory(category: string, limit = false): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/challenges?category=${category}&limit=${limit}`).pipe(
      this.handleHttpError()
    );
  }

  getUserCompletedTrophies(): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/user}`).pipe(
      this.handleHttpError()
    );
  }

  getUserCompletedTrophiesByCategory(category: string): Observable<any> {
    return this.http.get(`${this.API_TROPHY_BASE_URL}/user?category=${category}`).pipe(
      this.handleHttpError()
    );
  }

  // --- LIBRARY ---
  getBookContent(id: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/${id}/read`).pipe(
      this.handleHttpError()
    );
  }

  getBookData(id: string): Observable<any> {
    const options = {
      context: new HttpContext().set(CACHE_REQUEST, true)
    };

    return this.http.get(`${this.API_LIBRARY_BASE_URL}/${id}`, options).pipe(
      this.handleHttpError()
    );
  }

  getTrendingBooksForDuration(duration: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/trending?duration=${duration}`).pipe(
      this.handleHttpError()
    );
  }

  // --- USER ---
  // http://localhost:5164/api/user
  getUserInformation(): Observable<any> {
    return this.http.get(`${API_URL}${USER_ROUTE}`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/dashboard/streaks
  getUserStreaks(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/streaks`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/dashboard/activity
  getUserActivity(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/activity`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/dashboard/overview/trophies
  getUserOverviewTrophies(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/overview/trophies`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/dashboard/overview/books
  getUserOverviewBooks(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/overview/books`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/dashboard/trophy-case
  getUserTrophyCase(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_TROPHY_ROUTE}`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/dashboard/clubs
  getUserClubs(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_CLUBS_ROUTE}`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/wishlist
  getUserWishlist(): Observable<any> {
    return this.http.get(`${API_URL}${USER_WISHLIST_ROUTE}`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/authors
  getUserAuthors(): Observable<any> {
    return this.http.get(`${API_URL}${USER_AUTHORS_ROUTE}`).pipe(
      this.handleHttpError()
    );
  }

  // http://localhost:5164/api/user/statistics
  getUserStatistics(): Observable<any> {
    return this.http.get(`${API_URL}${USER_STATISTICS_ROUTE}`).pipe(
      this.handleHttpError()
    );
  }
}
