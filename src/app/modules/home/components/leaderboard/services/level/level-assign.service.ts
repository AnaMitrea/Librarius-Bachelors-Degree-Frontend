import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LevelAssignService {

  constructor(private apiService: ApiService) { }

  getLevelsOrderedAsc(asc = true): Observable<any> {
    return this.apiService.getLevelsOrderedAsc(asc);
  }
}
