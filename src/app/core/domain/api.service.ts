import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CACHE_REQUEST} from "@app-core/interceptor/cache-request-interceptor/tokens";
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
import {HttpServiceBaseService} from "@app-core/domain/http-service-base.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpServiceBaseService {
  readonly API_LIBRARY_BASE_URL = `${API_URL}${LIBRARY_BOOK_ROUTE}`;

  constructor(private http: HttpClient) {
    super();
  }

  // --- LIBRARY ---
  getBookContent(id: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/${id}/read`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  getBookData(id: string): Observable<any> {
    const options = {
      context: new HttpContext().set(CACHE_REQUEST, true)
    };

    return this.http.get(`${this.API_LIBRARY_BASE_URL}/${id}`, options).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  getTrendingBooksForDuration(duration: string): Observable<any> {
    return this.http.get(`${this.API_LIBRARY_BASE_URL}/trending?duration=${duration}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // --- USER ---
  // http://localhost:5164/api/user
  getUserInformation(): Observable<any> {
    return this.http.get(`${API_URL}${USER_ROUTE}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/dashboard/streaks
  getUserStreaks(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/streaks`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/dashboard/activity
  getUserActivity(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/activity`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/dashboard/overview/trophies
  getUserOverviewTrophies(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/overview/trophies`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/dashboard/overview/books
  getUserOverviewBooks(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_ROUTE}/overview/books`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/dashboard/trophy-case
  getUserTrophyCase(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_TROPHY_ROUTE}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/dashboard/clubs
  getUserClubs(): Observable<any> {
    return this.http.get(`${API_URL}${USER_DASHBOARD_CLUBS_ROUTE}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/wishlist
  getUserWishlist(): Observable<any> {
    return this.http.get(`${API_URL}${USER_WISHLIST_ROUTE}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/authors
  getUserAuthors(): Observable<any> {
    return this.http.get(`${API_URL}${USER_AUTHORS_ROUTE}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }

  // http://localhost:5164/api/user/statistics
  getUserStatistics(): Observable<any> {
    return this.http.get(`${API_URL}${USER_STATISTICS_ROUTE}`).pipe(
      catchError((error) => throwError(() => this.handleError(error)))
    );
  }
}
