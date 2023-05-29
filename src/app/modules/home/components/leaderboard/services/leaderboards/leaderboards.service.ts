import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LeaderboardsService {

  constructor(private apiService: ApiService) { }

  getAllUsersRankByMinutesDesc(): Observable<any> {
    return this.apiService.getAllUsersRankByMinutesDesc();
  }

  getAllUsersRankByNumberOfBooksDesc(): Observable<any> {
    return this.apiService.getAllUsersRankByNumberOfBooksDesc();
  }

  getAllUsersRankByPointsDesc(): Observable<any> {
    return this.apiService.getAllUsersRankByPointsDesc();
  }
}
