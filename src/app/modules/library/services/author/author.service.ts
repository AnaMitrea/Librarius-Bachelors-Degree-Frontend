import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private apiService: ApiService) {}

  getAuthorInformation(id: number) {
    return this.apiService.getAuthorInformation(id);
  }

  getAuthorBooks(authorId: number, sortingOptions: number) {
    return this.apiService.getAuthorBooks(authorId, sortingOptions);
  }

  setUserSubscribedToAuthor(authorId: number) {
    return this.apiService.setAuthorSubscription(authorId);
  }

  getUserSubscriptionStatus(authorId: number) {
    return this.apiService.getAuthorSubscriptionStatus(authorId);
  }
}
