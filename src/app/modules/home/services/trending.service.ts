import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../../core';
import { Book } from '../models';
import { mapBookDtoToBook } from './transformers';
import { LIBRARY_BOOK_ROUTE } from '@app-utils/constants';
import {ApiService} from "@app-core/domain/api.service";

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  getTrendingBooks(duration: string): Observable<Book[]> {
    return this.apiService.getTrendingBooksForDuration(duration).pipe(
        map((response: any) => response.result.map(mapBookDtoToBook))
    );
  }
}
