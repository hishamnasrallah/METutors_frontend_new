import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  AVAILABILITY_HOURS_CONST,
  COMPUTER_SKILLS,
  COURSE_TUITION_TYPES_CONST,
  DEGREE_FIELDS,
  DEGREE_LEVELS,
  GENDERS,
  generalConstants,
  InterviewStatus,
  LANGUAGES_LEVELS_CONST,
  SORTED_DAYS_WEEK,
  TEACHING_EXPERIENCE,
} from '@metutor/config';
import { ICity, ICountry, ITutor } from '@metutor/core/models';

@Component({
  selector: 'metutors-tutor-settings-profile',
  templateUrl: './tutor-settings-profile.component.html',
  styleUrls: ['./tutor-settings-profile.component.scss'],
  providers: [DatePipe],
})
export class TutorSettingsProfileComponent implements OnInit {
  @Input() set user(_tutor: ITutor) {
    if (_tutor) {
      this.tutor = _tutor;
      console.log(_tutor);
      this.personalInfoForm?.patchValue({
        middleName: _tutor?.middleName,
        nationality: _tutor?.nationality,
        dateOfBirth: new Date(_tutor.dateOfBirth || ''),
        address: _tutor?.address,
        address2: _tutor?.address2,
        gender: _tutor?.gender,
        country: _tutor?.country,
        city: _tutor?.city,
        bio: _tutor?.bio,
        postalCode: _tutor?.postalCode,
      });
      this.personalInfoForm.updateValueAndValidity();

      this.qualificationForm?.patchValue({
        nameOfUniversity: _tutor?.qualifications?.nameOfUniversity,
        computerSkills: _tutor?.qualifications?.computerSkills,
        degreeLevel: _tutor?.qualifications?.degreeLevel,
        teachingExperience: _tutor?.qualifications?.teachingExperience,
        degreeField: _tutor?.qualifications?.degreeField,
        teachingExperienceOnline:
          _tutor?.qualifications?.teachingExperienceOnline,
        currentEmployer: _tutor?.qualifications?.currentEmployer,
        currentTitle: _tutor?.qualifications?.currentTitle,
      });
      this.qualificationForm.updateValueAndValidity();

      this.teachingForm?.patchValue({
        startDate: _tutor?.specifications?.availabilityStartDate,
        endDate: _tutor?.specifications?.availabilityEndDate,
        // availability: _tutor?.specifications?.degreeLevel,
        typeOfTutoring: _tutor?.specifications?.typeOfTutoring,
      });
      this.teachingForm.updateValueAndValidity();

      this.loadCities.emit(_tutor?.country);
    }
  }
  @Input() cities: ICity[] | null;
  @Input() loading: boolean | null;
  @Input() isLoadingTutor: boolean;
  @Input() isCompleteProfile: boolean;
  @Input() countries: ICountry[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() submitInterview = new EventEmitter();
  @Output() loadCities = new EventEmitter<string>();

  tutor: ITutor;
  genders = GENDERS;
  maxDate = new Date();
  minDate = new Date();
  teachingForm: FormGroup;
  days = SORTED_DAYS_WEEK;
  skills = COMPUTER_SKILLS;
  personalInfoForm: FormGroup;
  selectedDays: number[] = [];
  qualificationForm: FormGroup;
  degreeLevels = DEGREE_LEVELS;
  degreeFields = DEGREE_FIELDS;
  levels = LANGUAGES_LEVELS_CONST;
  experiences = TEACHING_EXPERIENCE;
  interviewStatus = InterviewStatus;
  types = COURSE_TUITION_TYPES_CONST;
  nationalId = generalConstants.nationalId;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _datePipe: DatePipe
  ) {
    this.personalInfoForm = this._fb.group({
      middleName: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: [null, [Validators.required]],
      address2: [null],
      gender: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      postalCode: [null, [Validators.required]],
    });

    this.qualificationForm = this._fb.group({
      nameOfUniversity: [null, [Validators.required]],
      computerSkills: [null, [Validators.required]],
      degreeLevel: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      // languages: this._fb.array([]),
      teachingExperienceOnline: [null, [Validators.required]],
      currentEmployer: [null],
      currentTitle: [null],
      // video: [null, Validators.required],
    });

    this.teachingForm = this._fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      availability: this._fb.array([]),
      typeOfTutoring: [null, [Validators.required]],
    });

    SORTED_DAYS_WEEK.forEach(() => {
      this.addAvailability();
    });
  }

  ngOnInit(): void {}

  returnZero(): number {
    return 0;
  }

  get middleName(): AbstractControl | null {
    return this.personalInfoForm.get('middleName');
  }

  get nationality(): AbstractControl | null {
    return this.personalInfoForm.get('nationality');
  }

  get dateOfBirth(): AbstractControl | null {
    return this.personalInfoForm.get('dateOfBirth');
  }

  get address(): AbstractControl | null {
    return this.personalInfoForm.get('address');
  }

  get address2(): AbstractControl | null {
    return this.personalInfoForm.get('address2');
  }

  get gender(): AbstractControl | null {
    return this.personalInfoForm.get('gender');
  }

  get country(): AbstractControl | null {
    return this.personalInfoForm.get('country');
  }

  get city(): AbstractControl | null {
    return this.personalInfoForm.get('city');
  }

  get bio(): AbstractControl | null {
    return this.personalInfoForm.get('bio');
  }
  get postalCode(): AbstractControl | null {
    return this.personalInfoForm.get('postalCode');
  }

  get nameOfUniversity(): AbstractControl | null {
    return this.qualificationForm.get('nameOfUniversity');
  }

  get computerSkills(): AbstractControl | null {
    return this.qualificationForm.get('computerSkills');
  }

  get degreeLevel(): AbstractControl | null {
    return this.qualificationForm.get('degreeLevel');
  }

  get teachingExperience(): AbstractControl | null {
    return this.qualificationForm.get('teachingExperience');
  }

  get degreeField(): AbstractControl | null {
    return this.qualificationForm.get('degreeField');
  }

  get teachingExperienceOnline(): AbstractControl | null {
    return this.qualificationForm.get('teachingExperienceOnline');
  }

  get currentEmployer(): AbstractControl | null {
    return this.qualificationForm.get('currentEmployer');
  }

  get currentTitle(): AbstractControl | null {
    return this.qualificationForm.get('currentTitle');
  }

  get video(): AbstractControl | null {
    return this.qualificationForm.get('video');
  }

  get languages(): FormArray {
    return this.qualificationForm?.get('languages') as FormArray;
  }

  get startDate(): AbstractControl | null {
    return this.teachingForm.get('startDate');
  }

  get endDate(): AbstractControl | null {
    return this.teachingForm.get('endDate');
  }

  get typeOfTutoring(): AbstractControl | null {
    return this.teachingForm.get('typeOfTutoring');
  }

  get availability(): FormArray {
    return this.teachingForm?.get('availability') as FormArray;
  }

  newAvailability(): FormGroup {
    return this._fb.group({
      day: [null],
      timeSlots: [[]],
    });
  }

  addAvailability(): void {
    this.availability.push(this.newAvailability());
  }

  onChangeDay(index: number): void {
    if (this.selectedDays.includes(index)) {
      this.selectedDays.splice(this.selectedDays.indexOf(index), 1);
      this.availability.at(index).patchValue({ day: null, timeSlots: [] });
    } else {
      this.selectedDays.push(index);
      this.availability.at(index).patchValue({ day: index });
      this.openDialog(index);
    }
  }

  openDialog(index: number) {
    const dialogRef = this._dialog.open(DialogSelectAvailabilityDialog, {
      width: '500px',
      data: index,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.length) {
        this.availability
          .at(index)
          .patchValue({ day: index, timeSlots: result });
      } else {
        this.selectedDays.splice(this.selectedDays.indexOf(index), 1);
        this.availability.at(index).patchValue({ day: null, timeSlots: [] });
      }
    });
  }

  submitPersonalInfo(form: FormGroup): void {
    if (form.valid) {
      const data = {
        step: '1',
        middle_name: this.middleName?.value,
        gender: this.gender?.value,
        nationality: this.nationality?.value,
        date_of_birth: this._datePipe.transform(
          this.dateOfBirth?.value,
          'dd/MM/yyyy'
        ),
        address: this.address?.value,
        address2: this.address2?.value || '',
        bio: this.bio?.value,
        country: this.country?.value,
        city: this.city?.value,
        postal_code: this.postalCode?.value,
      };

      this.submitForm.emit(data);
    }
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'select-availability-hours.dialog.html',
  styleUrls: ['./tutor-settings-profile.component.scss'],
})
export class DialogSelectAvailabilityDialog {
  id!: number;
  selectedHoursList: any = [];
  selectedHours: number[] = [];
  hours = AVAILABILITY_HOURS_CONST;

  constructor(
    public dialogRef: MatDialogRef<DialogSelectAvailabilityDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) {
      this.id = data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSelectHour(hour: any, index: number): void {
    if (this.selectedHours.includes(index)) {
      this.selectedHours.splice(this.selectedHours.indexOf(index), 1);
      this.selectedHoursList.forEach((item: any, i: number) => {
        if (item.id === index) this.selectedHoursList.splice(i, 1);
      });
    } else {
      this.selectedHours.push(index);
      this.selectedHoursList.push({
        id: index,
        startTime: hour?.startTime,
        endTime: hour?.endTime,
      });
    }
  }
}
