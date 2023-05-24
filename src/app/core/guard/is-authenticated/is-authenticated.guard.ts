import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable, tap} from 'rxjs';
import {AuthService} from "@app-modules/landing/shared/services/auth.service";
import {LOGIN_ROUTE} from "@app-utils/constants";

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn$.pipe(
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate([`${LOGIN_ROUTE}`]);
          return false;
        }
        return true;
      })
    );
  }
}
