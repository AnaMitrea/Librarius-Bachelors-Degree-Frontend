export const getErrorMsgRequiredValue = (control: any) => {
  return control.hasError('required') ? 'You must enter a value' : '';
}

export const getErrorMessageEmail = (control: any) => {
  if (control.hasError('required')) {
    return 'You must enter a value';
  }

  if (control.hasError('email')) {
    return 'Not a valid email';
  }

  return '';
};

export const getErrorMessagePassword = (control: any) => {
  if (control.hasError('required')) {
    return 'Password is required';
  }
  if (control.hasError('minlength')) {
    return 'Password should be at least 8 characters long';
  }
  if (control.hasError('pattern')) {
    return 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }
  return '';
};

export const getErrorMessageConfirmPassword = (control: any) => {
  if (control.hasError('required')) {
    return 'Password is required';
  }
  if (control.hasError('minlength')) {
    return 'Password should be at least 8 characters long';
  }
  if (control.hasError('pattern')) {
    return 'Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character';
  }
  if (control.hasError('mismatch')) {
    return 'Passwords must match.';
  }
  return '';
};
