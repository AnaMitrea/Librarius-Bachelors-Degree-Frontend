import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ApiService} from "@app-core/domain/api.service";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private apiService: ApiService) {}

  getBookData(id: string): Observable<any> {
    return this.apiService.getBookData(id);
  }

  getBookContent(id: string): Observable<any> {
    return this.apiService.getBookContent(id);
  }
}
