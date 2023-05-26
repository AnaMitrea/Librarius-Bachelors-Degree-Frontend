import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "@app-core/domain/api.service";
import {
  BookReadingTimeRequestDto,
  LikeReviewRequestDto,
  ReviewRequestDto,
  SendReviewRequestDto
} from "@app-shared/models/transfer/book-dto";

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

  setReview(body: SendReviewRequestDto): Observable<any> {
    return this.apiService.setUserReview(body);
  }

  removeReview(reviewId: number): Observable<any> {
    return this.apiService.removeUserReview(reviewId);
  }

  markBookAsFinished(body: BookReadingTimeRequestDto): Observable<any> {
    return this.apiService.markBookAsFinished(body);
  }

  saveReadingTimeForBook(body: BookReadingTimeRequestDto): Observable<any> {
    return this.apiService.updateUserReadingTimeSpent(body);
  }
}
