import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from "@app-core/constants";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('jwt_token_auth');
    // todo check expiration date before

    this._isLoggedIn$.next(!!token);
  }

  login(username: string, password: string) {
    const body = {
      Username: username,
      Password: password
    };

    return this.http.post(`${API_URL}/account/login`, body).pipe(
      tap((data: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem('jwt_token_auth', data.result.jwtToken);
      })
    );
  }
}
