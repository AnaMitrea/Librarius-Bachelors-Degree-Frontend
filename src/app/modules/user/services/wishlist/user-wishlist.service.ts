import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserWishlistService {

  constructor(private apiService: ApiService) { }

  getUserFavoriteBooks(): Observable<any> {
    return this.apiService.getUserFavorites();
  }

  removeUserFavoriteBook(bookId: string): Observable<any> {
    return this.apiService.removeUserFavoriteBook(bookId);
  }
}
