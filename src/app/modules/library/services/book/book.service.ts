import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { API_URL } from '@app-core/constants';
import { LIBRARY_BOOK_ROUTE } from '@app-utils/constants';
import { CACHE_REQUEST } from "@app-core/interceptor/cache-request-interceptor/tokens";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) {}

  getBookData(id: string): Observable<any> {
    const options = {
      context: new HttpContext().set(CACHE_REQUEST, true)
    };

    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/${id}`, options).pipe(
      catchError(this.handleError)
    );
  }

  getBookContent(id: string): Observable<any> {
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/${id}/read`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
