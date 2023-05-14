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

  getCategoriesByBookshelf(): Observable<any> {
    return this.apiService.getCategoriesByBookshelf();
  }
}
