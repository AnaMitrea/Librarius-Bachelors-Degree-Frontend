import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import { BreakpointObserver } from "@angular/cdk/layout";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable, Subject, takeUntil} from "rxjs";
import { StepperOrientation } from '@angular/material/stepper';
import { Router } from "@angular/router";
import {
  getErrorMessageConfirmPassword,
  getErrorMessageEmail,
  getErrorMessagePassword,
  getErrorMsgRequiredValue
} from "@app-modules/landing/shared/forms/errors/error-messages";
import {HOME_ROUTE, LANDING_ROUTE, LOGIN_ROUTE} from '@app-utils/constants';
import {RegisterRequestDto} from "@app-modules/landing/shared/models";
import {RegisterService} from "@app-modules/landing/shared/services/register/register.service";
import {ApiResponseModel} from "@app-core/domain/model/api-response-model";
import {Utils as U} from "@app-utils/lodash/utils";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  hidePwd = true;
  hideRePwd = true;
  isLastStepCompleted = false;
  lastState: string = '';
  getErrorMsgRequired = getErrorMsgRequiredValue;
  getErrorMsgEmail = getErrorMessageEmail;
  getErrorMsgPwd = getErrorMessagePassword;
  getErrorMsgConfirm = getErrorMessageConfirmPassword;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private registerService: RegisterService,
    private _formBuilder: FormBuilder,
    private router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    this.firstFormGroup = this._formBuilder.group({
      username: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      rePassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
          this.validateAreEqual.bind(this)
        ]
      ],
    });

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical'))
      );
  }

  ngOnInit(): void { }

  private validateAreEqual(fieldControl: any) {
    if (!this.thirdFormGroup) {
      return null;
    }

    return fieldControl.value === this.thirdFormGroup.get('password')?.value
      ? null
      : { mismatch: true };
  }

  onBackRegister() {
    this.router.navigateByUrl(LANDING_ROUTE).then();
  }

  onConfirmClick() {
    this.lastState = 'done';

    const body : RegisterRequestDto = {
      username: this.firstFormGroup.get('username')?.value,
      email: this.secondFormGroup.get('email')?.value,
      password: this.thirdFormGroup.get('password')?.value,
      rePassword: this.thirdFormGroup.get('rePassword')?.value
    };

    this.registerService.registerAccount(body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ApiResponseModel<any>) => {
        if(data && data.result)
          this.router.navigateByUrl(`${LOGIN_ROUTE}`);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
