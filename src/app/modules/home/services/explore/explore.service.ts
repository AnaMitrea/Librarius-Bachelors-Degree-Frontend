import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(
    private apiService: ApiService
  ) {}

  getBookshelves(): Observable<any> {
    return this.apiService.getBookshelves();
  }

  getBookshelvesBooks(maxResults?: number, title?: string): Observable<any> {
     return this.apiService.getBookshelfBooks(maxResults, title);
  }

  getBookshelvesWithOrderedBooks(maxResults?: number, title?: string): Observable<any> {
    return this.apiService.getBookshelfWithOrderedBooks(maxResults, title);
  }

  getBookshelfNoBooks(title?: string): Observable<any> {
    return this.apiService.getBookshelfNoBooks(title);
  }

  getCategoriesByBookshelf(): Observable<any> {
    return this.apiService.getCategoriesByBookshelf();
  }

  getCategoriesBooks(maxResults?: number): Observable<any> {
    return this.apiService.getCategoriesBooks(maxResults);
  }

  getCategoriesBooksNoBooks(title?: string): Observable<any> {
    return this.apiService.getCategoriesBooksNoBooks(title);
  }

  getCategoriesWithOrderedBooks(startFrom: string, maxResults?: number, title?: string): Observable<any> {
    return this.apiService.getCategoriesWithOrderedBooks(startFrom, maxResults, title);
  }

}
