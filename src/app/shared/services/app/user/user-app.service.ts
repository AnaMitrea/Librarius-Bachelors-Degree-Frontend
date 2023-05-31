import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAppService {

  constructor(private apiService: ApiService) { }

  getUserInformation(): Observable<any> {
    return this.apiService.getUserInformation();
  }

  getUserBooksReadingTracker(): Observable<any> {
    return this.apiService.getUserBooksReadingTracker();
  }

  getUserStreaks(): Observable<any> {
    return this.apiService.getUserStreaks();
  }

  getUserActivity(): Observable<any> {
    return this.apiService.getUserActivity();
  }
}
