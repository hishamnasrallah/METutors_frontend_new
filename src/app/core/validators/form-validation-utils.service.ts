import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationUtilsService {
  constructor() {}

  passwordsMatchValidator(
    passwordControlKey: string,
    confirmPasswordControlKey: string
  ): any {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      if (!formGroup) {
        return null;
      }

      const password = formGroup.get(passwordControlKey);
      const confirmPassword = formGroup.get(confirmPasswordControlKey);

      if (
        !password ||
        !confirmPassword ||
        !password.value ||
        !confirmPassword.value
      ) {
        return null;
      }

      if (password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }

  multipleWordsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const words: Array<string> = control.value.trim().split(' ');

      return words.length < 2 ? { multipleWords: true } : null;
    };
  }
}
