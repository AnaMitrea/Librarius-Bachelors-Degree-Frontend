import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL, TOKEN_NAME_LOCAL_STORAGE } from "@app-core/constants";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_NAME = TOKEN_NAME_LOCAL_STORAGE;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) {
    // todo check expiration date before

    this._isLoggedIn$.next(!!this.token);
  }

  login(username: string, password: string) {
    const body = {
      Username: username,
      Password: password
    };

    return this.http.post(`${API_URL}/account/login`, body).pipe(
      tap((data: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, data.result.jwtToken);
      })
    );
  }
}
