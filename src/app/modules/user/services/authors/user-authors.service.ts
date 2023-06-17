import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAuthorsService {

  constructor(private apiService: ApiService) { }

  getUserAuthors(): Observable<any> {
    return this.apiService.getUserAuthors();
  }
}
