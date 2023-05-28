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

  getBookshelvesBooks(maxResults: number): Observable<any> {
    return this.apiService.getBookshelfBooks((maxResults > 1) ? maxResults : 10);
  }

  getCategoriesByBookshelf(): Observable<any> {
    return this.apiService.getCategoriesByBookshelf();
  }

  getCategoriesBooks(maxResults: number): Observable<any> {
    return this.apiService.getCategoriesBooks((maxResults > 1) ? maxResults : 10);
  }
}
