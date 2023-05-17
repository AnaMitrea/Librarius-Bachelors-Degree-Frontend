import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "@app-core/domain/api.service";
import {LikeReviewRequestModel, ReviewRequestModel} from "@app-shared/models/transfer/book-dto";

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

  getBookReviews(body: ReviewRequestModel): Observable<any> {
    return this.apiService.getBookReviews(body);
  }

  updateReviewLike(body: LikeReviewRequestModel): Observable<any> {
    return this.apiService.updateReviewLike(body);
  }
}
