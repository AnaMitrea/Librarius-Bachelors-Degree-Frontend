import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  getErrorMessagePassword,
  getErrorMsgRequiredValue
} from "../../shared/forms/error-messages";
import {AuthService} from "@app-modules/landing/components/login/services/auth.service";
import {Router} from "@angular/router";
import {HOME_ROUTE} from "@app-utils/constants";
import {Utils as U} from "@app-utils/lodash/utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  getErrorMsgRequired = getErrorMsgRequiredValue;
  getErrorMsgPwd = getErrorMessagePassword;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username!, password!).subscribe(data => {
      const { jwtToken } = U.path(['result'], data);
      if (!!jwtToken) this.router.navigateByUrl(`${HOME_ROUTE}`)
    });
  }

  ngOnInit(): void {

  }
}
