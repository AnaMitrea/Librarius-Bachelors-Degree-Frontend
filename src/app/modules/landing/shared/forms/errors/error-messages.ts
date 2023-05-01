import {FormControl} from "@angular/forms";

export const invalidCredentialsMessage = 'Username or password incorrect.';

export const getErrorMsgRequiredValue = (control: FormControl) => {
  return control.hasError('required') ? 'You must enter a value' : '';
}

export const getErrorMessageEmail = (control: FormControl) => {
  if (control.hasError('required')) {
    return 'You must enter a value';
  }

  if (control.hasError('email')) {
    return 'Not a valid email';
  }

  return '';
}

export const getErrorMessagePassword = (control: FormControl) => {
  if (control.hasError('required')) {
    return 'You must enter a value';
  }

  if (control.hasError('password')) {
    return 'Not a valid password';
  }

  return '';
}
