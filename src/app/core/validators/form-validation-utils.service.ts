import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { convertTimeToDateISO, generalConstants } from '@metutor/config';
import {
  FormGroup,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationUtilsService {
  constructor(private _datePipe: DatePipe) {}

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

  timeAfter24Validator(dateControlKey: string, timeControlKey: string): any {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      if (!formGroup) {
        return null;
      }

      const date = formGroup.get(dateControlKey);
      const time = formGroup.get(timeControlKey);

      if (!time || !time.value || !date || !date.value) {
        return null;
      }

      if (
        Math.abs(
          new Date(
            Date.parse(
              this._datePipe.transform(new Date(date.value), 'yyyy-MM-dd') +
                ' ' +
                time.value
            )
          ).getTime() - new Date().getTime()
        ) /
          36e5 <
        generalConstants.startingHoursLimit
      ) {
        return { startingHoursLimit: true };
      }

      return null;
    };
  }

  timeAfterNowValidator(dateControlKey: string, timeControlKey: string): any {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      if (!formGroup) {
        return null;
      }

      const date = formGroup.get(dateControlKey);
      const time = formGroup.get(timeControlKey);

      if (!time || !time.value || !date || !date.value) {
        return null;
      }

      if (
        new Date(
          Date.parse(
            this._datePipe.transform(new Date(date.value), 'yyyy-MM-dd') +
              ' ' +
              time.value
          )
        ).getTime() -
          new Date().getTime() <
        0
      ) {
        return { invalidTime: true };
      }

      return null;
    };
  }

  compareTimeValidator(
    startTimeControlKey: string,
    endTimeControlKey: string
  ): any {
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      if (!formGroup) {
        return null;
      }

      const startTime = formGroup.get(startTimeControlKey);
      const endTime = formGroup.get(endTimeControlKey);

      if (!startTime || !startTime.value || !endTime || !endTime.value) {
        return null;
      }

      if (startTime.value === endTime.value) {
        return { compareError: true };
      }

      if (
        new Date(convertTimeToDateISO(endTime.value)).getTime() -
          new Date(convertTimeToDateISO(startTime.value)).getTime() <
        0
      ) {
        return { compareError: true };
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
