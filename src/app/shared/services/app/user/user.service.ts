import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  getUserInformation(): Observable<any> {
    return this.apiService.getUserInformation();
  }

  getUserBooksReadingTracker(): Observable<any> {
    return this.apiService.getUserBooksReadingTracker();
  }
  getUserActivity(): Observable<any> {
    return this.apiService.getUserActivity();
  }

  getUserInProgressBooks(): Observable<any> {
    return this.apiService.getUserInProgressBooks();
  }
}
