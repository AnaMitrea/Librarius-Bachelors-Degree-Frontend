import { Injectable } from '@angular/core';
import {ApiService} from "@app-core/domain/api.service";
import {RegisterRequestDto} from "@app-modules/landing/shared/models";
import {Observable, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private apiService: ApiService) { }

  registerAccount(body: RegisterRequestDto): Observable<any> {
    return this.apiService.registerUser(body);
  }
}
