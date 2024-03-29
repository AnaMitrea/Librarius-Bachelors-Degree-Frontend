import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SHARED_USER_STATE_LOCAL_STORAGE_KEY, TOKEN_NAME_LOCAL_STORAGE} from "@app-core/constants";
import {BehaviorSubject, tap} from "rxjs";
import {ApiService} from "@app-core/domain/api.service";
import jwt_decode from "jwt-decode";
import {AuthJwtToken} from "@app-modules/landing/shared/models";
import {UserStoreService} from "@app-store/services/user-store.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_NAME = TOKEN_NAME_LOCAL_STORAGE;
  private readonly STORE_KEY = SHARED_USER_STATE_LOCAL_STORAGE_KEY;
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): string | null {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private userStoreDataService: UserStoreService
  ) {
    if (this.isTokenExpiredOrUndefined()) {
      localStorage.removeItem(this.TOKEN_NAME);
      this._isLoggedIn$.next(false);
    } else {
      this._isLoggedIn$.next(true);
    }
  }

  private isTokenExpiredOrUndefined(): boolean {
    if (this.token) {
      const decodedToken = jwt_decode<AuthJwtToken>(this.token);
      const expirationDate = new Date(decodedToken.exp * 1000);
      return expirationDate.getTime() <= new Date().getTime();
    }
    else
      return true;
  }

  login(username: string, password: string) {
    return this.apiService.getUserLoggedIn({
      Username: username,
      Password: password
    }).pipe(
      tap((data: any) => {
        if (data) {
          this._isLoggedIn$.next(true);
          localStorage.setItem(this.TOKEN_NAME, data.result.jwtToken);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem(this.STORE_KEY);
    this._isLoggedIn$.next(false);
  }
}
