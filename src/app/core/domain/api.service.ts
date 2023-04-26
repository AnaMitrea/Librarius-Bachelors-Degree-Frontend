import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {CACHE_REQUEST} from "@app-core/interceptor/cache-request-interceptor/tokens";
import {API_URL} from "@app-core/constants";
import {LIBRARY_BOOK_ROUTE} from "@app-utils/constants";
import {HttpServiceBaseService} from "@app-core/domain/http-service-base.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService extends HttpServiceBaseService {
  readonly API_LIBRARY_BASE_URL = `${API_URL}${LIBRARY_BOOK_ROUTE}`;

  constructor(private http: HttpClient) {
    super();
  }

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
}
