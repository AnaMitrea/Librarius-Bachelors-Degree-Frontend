import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {getErrorMessageEmail, getErrorMessagePassword} from "../../shared/forms/error-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hide = true;
  getErrorMsgEmail = getErrorMessageEmail;
  getErrorMsgPwd = getErrorMessagePassword;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

   login() {
    console.log(this.loginForm.value);
  }
}
