import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../../../../shared/models';
import { mapBookDtoToBook } from '../../shared/transformers';
import { ApiService } from "@app-core/domain/api.service";

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
