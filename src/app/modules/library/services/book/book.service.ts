import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "@app-core/domain/api.service";
import {LikeReviewRequestDto, ReviewRequestDto} from "@app-shared/models/transfer/book-dto";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apiService: ApiService) {}

  getBookData(id: string): Observable<any> {
    return this.apiService.getBookData(id);
  }

  getBookContent(id: string): Observable<any> {
    return this.apiService.getBookContent(id);
  }

  getBookAverageReadingTime(id: string): Observable<any> {
    return this.apiService.getBookAverageReadingTime(id);
  }

  getBookReviews(body: ReviewRequestDto): Observable<any> {
    return this.apiService.getBookReviews(body);
  }

  updateReviewLike(body: LikeReviewRequestDto): Observable<any> {
    return this.apiService.updateReviewLike(body);
  }
}
