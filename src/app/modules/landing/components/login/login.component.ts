import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  getErrorMessageEmail,
  getErrorMessagePassword,
  getErrorMsgRequiredValue
} from "../../shared/forms/error-messages";
import {AuthService} from "@app-modules/landing/components/login/services/auth.service";
import {readSpanComment} from "@angular/compiler-cli/src/ngtsc/typecheck/src/comments";

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

  constructor(private authService: AuthService) {}

  login() {
    if (this.loginForm.invalid) return;

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(username!, password!).subscribe(data => {
        console.log(data);
    });
  }

  ngOnInit(): void {

  }
}
