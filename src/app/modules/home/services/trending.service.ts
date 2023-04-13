import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../core';
import { Book } from '../models';
import { mapBookDtoToBook } from './transformers';
import { LIBRARY_BOOK_ROUTE } from '@app-utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private http: HttpClient) { }

  private fetchTrendingBooks(duration: string): Observable<any> {
    return this.http.get(`${API_URL}${LIBRARY_BOOK_ROUTE}/trending?duration=${duration}`);
  }

  getTrendingBooks(duration: string): Observable<Book[]> {
    return this.fetchTrendingBooks(duration).pipe(
        map((response: any) => response.result.map(mapBookDtoToBook))
    );
  }
}
