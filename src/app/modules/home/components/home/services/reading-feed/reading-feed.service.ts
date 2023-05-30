import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReadingFeedService {

  constructor(private apiService: ApiService) { }

  getReadingFeedBooks(): Observable<any> {
    return this.apiService.getReadingFeedBooks();
  }
}
