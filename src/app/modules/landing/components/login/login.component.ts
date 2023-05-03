import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { getErrorMessagePassword, getErrorMsgRequiredValue } from "@app-modules/landing/shared/forms/errors/error-messages";
import {AuthService} from "@app-modules/landing/shared/services/auth.service";
import {Router} from "@angular/router";
import {HOME_ROUTE} from "@app-utils/constants";
import {Utils as U} from "@app-utils/lodash/utils";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  getErrorMsgRequired = getErrorMsgRequiredValue;
  getErrorMsgPwd = getErrorMessagePassword;
  hide = true;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void { }

  login() {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username!, password!)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel) => {
        if(!!data && !!U.path(['result', 'jwtToken'], data))
          this.router.navigateByUrl(`${HOME_ROUTE}`);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
