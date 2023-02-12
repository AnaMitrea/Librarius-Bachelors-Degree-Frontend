import { Component, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import { FormBuilder, Validators } from "@angular/forms";
import { map, Observable } from "rxjs";
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from "@angular/router";
import { LANDING_ROUTE } from "../../shared/constants";
import {
  getErrorMessageEmail,
  getErrorMessagePassword,
  getErrorMsgRequiredValue
} from "../../shared/forms/error-messages";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent {
  isLastStepCompleted = false;
  lastState: string = '';
  getErrorMsgRequired = getErrorMsgRequiredValue;
  getErrorMsgEmail = getErrorMessageEmail;
  getErrorMsgPwd = getErrorMessagePassword;

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  thirdFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
    rePassword: ['', Validators.required],
  });
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private _formBuilder: FormBuilder,
              private router: Router,
              breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  onBackRegister() {
    this.router.navigateByUrl(LANDING_ROUTE).then();
  }

  onConfirmClick() {
    this.lastState = 'done';
    console.log(this.firstFormGroup.value);
    console.log(this.secondFormGroup.value);
    console.log(this.thirdFormGroup.value);
  }
}
