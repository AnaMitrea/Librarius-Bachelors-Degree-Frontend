import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrophyService {

  constructor(
    private apiService: ApiService
  ) {}

  getTrophiesByCategory(category: string, limit = false): Observable<any> {
    return this.apiService.getTrophiesByCategory(category, limit);
  }

  getUserCompletedTrophiesByCategory(category: string): Observable<any> {
    return this.apiService.getUserCompletedTrophiesByCategory(category);
  }

  getUserCompletedTrophies(): Observable<any> {
    return this.apiService.getUserCompletedTrophies();
  }

  getUserInProgressTrophiesByCategory(category: string): Observable<any> {
    return this.apiService.getUserInProgressTrophiesByCategory(category);
  }

  getUserInProgressTrophies(): Observable<any> {
    return this.apiService.getUserInProgressTrophies();
  }

  joinChallenge(id: number): Observable<any>  {
    return this.apiService.joinTrophyChallenge(id);
  }

  leaveChallenge(id: number): Observable<any>  {
    return this.apiService.leaveTrophyChallenge(id);
  }
}
