import { DatePipe } from '@angular/common';
import { ICity, ICountry, ITutor } from '@metutor/core/models';
import { AlertNotificationService } from '@metutor/core/components';
import {
  Input,
  OnInit,
  Inject,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  GENDERS,
  DEGREE_LEVELS,
  DEGREE_FIELDS,
  InterviewStatus,
  COMPUTER_SKILLS,
  SORTED_DAYS_WEEK,
  generalConstants,
  TEACHING_EXPERIENCE,
  LANGUAGES_LEVELS_CONST,
  AVAILABILITY_HOURS_CONST,
  COURSE_TUITION_TYPES_CONST,
} from '@metutor/config';

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

      this.personalInfoForm?.patchValue({
        firstName: _tutor?.firstName,
        lastName: _tutor?.lastName,
        middleName: _tutor?.middleName,
        nationality: _tutor?.nationality,
        dateOfBirth: new Date(_tutor.dateOfBirth || ''),
        address: _tutor?.address,
        address2: _tutor?.address2,
        gender: _tutor?.gender,
        country: _tutor?.country?.id,
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
        typeOfTutoring: _tutor?.specifications?.typeOfTutoring,
      });
      this.teachingForm.updateValueAndValidity();

      this.loadCities.emit(_tutor?.country?.id);

      const output: any[] = [];
      this.tutor?.availability?.forEach((avail: any) => {
        if (!this.selectedDays.includes(+avail?.day)) {
          this.selectedDays.push(+avail?.day);
        }

        const existing = output.filter((v) => +v.day == +avail.day);

        if (existing.length) {
          const existingIndex = output.indexOf(existing[0]);

          output[existingIndex].timeSlots = [
            ...output[existingIndex].timeSlots,
            {
              id: avail?.id,
              startTime: this._datePipe.transform(avail?.timeFrom, 'h:mm a'),
              endTime: this._datePipe.transform(avail?.timeTo, 'h:mm a'),
            },
          ];
        } else {
          output.push({
            day: +avail.day,
            timeSlots: [
              {
                id: avail?.id,
                startTime: this._datePipe.transform(avail?.timeFrom, 'h:mm a'),
                endTime: this._datePipe.transform(avail?.timeTo, 'h:mm a'),
              },
            ],
          });
        }
      });

      output.forEach((item) => {
        this.availability
          .at(item.day)
          .patchValue({ day: item.day, timeSlots: item.timeSlots });
      });
    }
  }
  @Input() cities: ICity[] | null;
  @Input() isChangeCover: boolean;
  @Input() loading: boolean | null;
  @Input() isLoadingTutor: boolean;
  @Input() isChangeAvatar: boolean;
  @Input() isUpdateProfile: boolean;
  @Input() countries: ICountry[] | null;

  @Output() submitForm = new EventEmitter();
  @Output() submitInterview = new EventEmitter();
  @Output() changeCover = new EventEmitter<File>();
  @Output() joinMeeting = new EventEmitter<number>();
  @Output() loadCities = new EventEmitter<string>();
  @Output() changeAvatar = new EventEmitter<File>();

  tutor: ITutor;
  genders = GENDERS;
  filterCity: string;
  maxDate = new Date();
  minDate = new Date();
  selectedForm: number;
  filterDegree: string;
  filterCountry: string;
  teachingForm: FormGroup;
  days = SORTED_DAYS_WEEK;
  skills = COMPUTER_SKILLS;
  filterNationality: string;
  personalInfoForm: FormGroup;
  selectedDays: number[] = [];
  qualificationForm: FormGroup;
  degreeLevels = DEGREE_LEVELS;
  levels = LANGUAGES_LEVELS_CONST;
  experiences = TEACHING_EXPERIENCE;
  interviewStatus = InterviewStatus;
  types = COURSE_TUITION_TYPES_CONST;
  nationalId = generalConstants.nationalId;

  constructor(
    private _fb: FormBuilder,
    private _dialog: MatDialog,
    private _datePipe: DatePipe,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.personalInfoForm = this._fb.group({
      firstName: [null, [Validators.minLength(3), Validators.maxLength(15)]],
      lastName: [null, [Validators.minLength(3), Validators.maxLength(15)]],
      middleName: [null, [Validators.minLength(3), Validators.maxLength(15)]],
      nationality: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      address: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(120),
        ],
      ],
      address2: [null, [Validators.minLength(1), Validators.maxLength(120)]],
      gender: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      bio: [
        null,
        [
          Validators.required,
          Validators.minLength(200),
          Validators.maxLength(400),
        ],
      ],
      postalCode: [
        null,
        [Validators.required, Validators.minLength(3), Validators.maxLength(6)],
      ],
    });

    this.qualificationForm = this._fb.group({
      nameOfUniversity: [null, [Validators.required]],
      computerSkills: [null, [Validators.required]],
      degreeLevel: [null, [Validators.required]],
      teachingExperience: [null, [Validators.required]],
      degreeField: [null, [Validators.required]],
      teachingExperienceOnline: [null, [Validators.required]],
      currentEmployer: [null],
      currentTitle: [null],
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

  ngOnInit(): void {
    this.maxDate.setFullYear(new Date().getFullYear() - 18);
  }

  returnZero(): number {
    return 0;
  }

  get firstName(): AbstractControl | null {
    return this.personalInfoForm.get('firstName');
  }

  get lastName(): AbstractControl | null {
    return this.personalInfoForm.get('lastName');
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

  get filteredNationalities(): ICountry[] {
    if (this.filterNationality) {
      return (
        this.countries?.filter((country) =>
          country?.name
            .toLowerCase()
            .includes(this.filterNationality.toLowerCase())
        ) || []
      );
    } else {
      return this.countries || [];
    }
  }

  get filteredCountries(): ICountry[] {
    if (this.filterCountry) {
      return (
        this.countries?.filter((country) =>
          country?.name.toLowerCase().includes(this.filterCountry.toLowerCase())
        ) || []
      );
    } else {
      return this.countries || [];
    }
  }

  get filteredCities(): ICity[] {
    if (this.filterCity) {
      return (
        this.cities?.filter((city) =>
          city?.name.toLowerCase().includes(this.filterCity.toLowerCase())
        ) || []
      );
    } else {
      return this.cities || [];
    }
  }

  get filteredDegreeFields(): string[] {
    if (this.filterDegree) {
      return (
        DEGREE_FIELDS?.filter((degree) =>
          degree?.toLowerCase().includes(this.filterDegree.toLowerCase())
        ) || []
      );
    } else {
      return DEGREE_FIELDS;
    }
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

      this.teachingForm?.markAsDirty();
    });
  }

  onChangeAvatar(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this._alertNotificationService.error('Only images are allowed');

        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 2MB');

        return;
      }

      this.changeAvatar.emit(file);
    }
  }

  onChangeCover(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target?.files[0];
      const mimeType = event.target.files[0].type;

      if (mimeType.match(/image\/*/) == null) {
        this._alertNotificationService.error('Only images are allowed');

        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        this._alertNotificationService.error('Allowed file size is 2MB');

        return;
      }

      this.changeCover.emit(file);
    }
  }

  submitPersonalInfo(form: FormGroup): void {
    if (form.valid) {
      this.selectedForm = 1;

      const data = {
        step: '1',
        first_name: this.firstName?.value,
        last_name: this.lastName?.value,
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

  submitQualificationDetails(form: FormGroup): void {
    if (form.valid) {
      this.selectedForm = 2;

      const data = {
        step: '3',
        name_of_university: this.nameOfUniversity?.value,
        degree_level: this.degreeLevel?.value,
        degree_field: this.degreeField?.value,
        computer_skills: this.computerSkills?.value,
        teaching_experience: this.teachingExperience?.value,
        current_employer: this.currentEmployer?.value,
        current_title: this.currentTitle?.value,
        teaching_experience_online: this.teachingExperienceOnline?.value,
      };

      this.submitForm.emit(data);
    }
  }

  submitTeachingSpecification(form: FormGroup): void {
    if (form.valid) {
      this.selectedForm = 3;

      const data = {
        step: '4',
        type_of_tutoring: this.typeOfTutoring?.value,
        availability_start_date: new Date(this.startDate?.value).toISOString(),
        availability_end_date: new Date(this.endDate?.value).toISOString(),
        availability: this.availability?.value
          ?.filter((itm: any) => itm?.day != null)
          ?.map((item: any) => ({
            day: item?.day,
            time_slots: item?.timeSlots?.map((slot: any) => ({
              start_time: new Date(`1970-01-01 ${slot?.startTime}`).toISOString(),
              end_time: new Date(`1970-01-01 ${slot?.endTime}`).toISOString(),
            })),
          })),
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
