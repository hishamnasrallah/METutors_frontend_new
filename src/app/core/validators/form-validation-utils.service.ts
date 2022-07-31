import { Injectable } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { generalConstants } from '@metutor/config';

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

  classroomTimeDurationValidator(
    durationControlKey: string,
    startTimeControlKey: string,
    endTimeControlKey: string
  ): any {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      if (!formGroup) {
        return null;
      }

      const duration = formGroup.get(durationControlKey);
      const startTime = formGroup.get(startTimeControlKey);
      const endTime = formGroup.get(endTimeControlKey);

      if (!startTime || !startTime.value || !endTime || !endTime.value) {
        return null;
      }

      if (startTime.value === endTime.value) {
        return { durationError: true };
      }

      if (!duration || !duration.value) {
        return null;
      }

      if (
        duration.value < generalConstants.classroomTimeDuration.min ||
        duration.value > generalConstants.classroomTimeDuration.max
      ) {
        return { durationError: true };
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

  minCharacterValidator(control: FormControl) {
    let value = (control.value || '').trim().length;
    let less = value < 3;

    return less ? { minlength: true } : null;
  }

  minPasswordValidation(control: FormControl) {
    let value = (control.value || '').trim().length;
    let less = value < 8;

    return less ? { minlength: true } : null;
  }

  maxCharacterValidator(control: FormControl) {
    let value = (control.value || '').trim().length;
    let greater = value > 100;

    return greater ? { maxlength: true } : null;
  }

  numbersOnlyValidation(control: FormControl): any {
    let value = (control.value || '').trim();
    let isNotANumber = isNaN(value);

    return isNotANumber ? { NotANumber: true } : null;
  }
}
