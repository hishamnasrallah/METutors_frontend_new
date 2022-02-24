import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertNotificationService } from 'src/app/core/components';
import {
  AuthService,
  LookupsService,
  TutorsService,
} from 'src/app/core/services';

@Component({
  selector: 'metutors-complete-tutor-profile',
  templateUrl: './complete-tutor-profile.component.html',
  styleUrls: ['./complete-tutor-profile.component.scss'],
  providers: [DatePipe],
})
export class CompleteTutorProfileComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  form3: FormGroup;
  form4: FormGroup;
  languageAdded = 0;
  language: FormGroup;
  spokenLanguages: any = [];
  loading2: boolean = false;
  loading3: boolean = false;
  loading4: boolean = false;
  loading1: boolean = false;
  subloading2: boolean = false;
  subloading1: boolean = false;
  fruits = [{ name: 'Lemon' }, { name: 'Lime' }, { name: 'Apple' }];

  // firstStep = true;
  // secondStep = false;
  // thirdStep = false;
  // fourthStep = false;
  step: string = 'STEP1';
  dateOfBirth: any;
  profilePic: any;
  coverPic: any;
  startDate!: string | null;
  endDate!: string | null;
  countries: any;
  cities: any;

  constructor(
    private _fb: FormBuilder,
    private _datePipe: DatePipe,
    private _authService: AuthService,
    private _tutorsService: TutorsService,
    private _lookupsService: LookupsService,
    private _alertNotificationService: AlertNotificationService
  ) {
    this.form = this._fb.group({
      middle_name: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      date_of_birth: [null, [Validators.required]],
      address: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: [null, [Validators.required]],
      address2: [null],
      bio: [null, [Validators.required]],
      postal_code: [null, [Validators.required]],
    });

    this.form2 = this._fb.group({});

    this.form3 = this._fb.group({
      name_of_university: [null, [Validators.required]],
      computer_skills: [null, [Validators.required]],
      degree_level: [null, [Validators.required]],
      teaching_experience: [null, [Validators.required]],
      degree_field: [null, [Validators.required]],
      teaching_experience_online: [null, [Validators.required]],
      current_employer: [null],
      current_title: [null],
    });

    this.language = this._fb.group({
      spoken_language: [null, [Validators.required]],
      spoken_language_level: [null, [Validators.required]],
    });

    this.form4 = this._fb.group({
      level_of_education: [null, [Validators.required]],
      expected_salary_per_hour: [
        null,
        [Validators.required, this.numbersOnlyValidation],
      ],
      field_of_study: [null, [Validators.required]],
      availability_start_date: [null, [Validators.required]],
      subject: [null, [Validators.required]],
      availability_end_date: [null, [Validators.required]],
      type_of_tutoring: [null, [Validators.required]],
      teaching_days: [null, [Validators.required]],
      teaching_hours: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this._lookupsService.getCountries().subscribe(
      (result) => {
        this.countries = result.countries;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  numbersOnlyValidation(control: FormControl): any {
    let value = (control.value || '').trim();
    let isNotANumber = isNaN(value);

    return isNotANumber ? { NotANumber: true } : null;
  }

  formatDate1() {
    this.dateOfBirth = this._datePipe.transform(
      this.form.get('date_of_birth')?.value,
      'dd/MM/yyyy'
    );
  }

  formatDate2() {
    this.startDate = this._datePipe.transform(
      this.form4.get('availability_start_date')?.value,
      'dd/MM/yyyy'
    );
  }

  formatDate3() {
    this.endDate = this._datePipe.transform(
      this.availability_end_date?.value,
      'dd/MM/yyyy'
    );
  }

  get middle_name(): AbstractControl | null {
    return this.form.get('middle_name');
  }

  get nationality(): AbstractControl | null {
    return this.form.get('nationality');
  }

  get date_of_birth(): AbstractControl | null {
    return this.form.get('date_of_birth');
  }

  get address(): AbstractControl | null {
    return this.form.get('address');
  }

  get gender(): AbstractControl | null {
    return this.form.get('gender');
  }

  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  get city(): AbstractControl | null {
    return this.form.get('city');
  }

  get bio(): AbstractControl | null {
    return this.form.get('bio');
  }

  get postal_code(): AbstractControl | null {
    return this.form.get('postal_code');
  }

  get name_of_university(): AbstractControl | null {
    return this.form3.get('name_of_university');
  }

  get computer_skills(): AbstractControl | null {
    return this.form3.get('computer_skills');
  }

  get degree_level(): AbstractControl | null {
    return this.form3.get('degree_level');
  }

  get teaching_experience(): AbstractControl | null {
    return this.form3.get('teaching_experience');
  }
  get degree_field(): AbstractControl | null {
    return this.form3.get('degree_field');
  }
  get teaching_experience_online(): AbstractControl | null {
    return this.form3.get('teaching_experience_online');
  }
  get current_employer(): AbstractControl | null {
    return this.form3.get('current_employer');
  }
  get current_title(): AbstractControl | null {
    return this.form3.get('current_title');
  }

  get spoken_language(): AbstractControl | null {
    return this.language.get('spoken_language');
  }

  get spoken_language_level(): AbstractControl | null {
    return this.language.get('spoken_language_level');
  }

  get level_of_education(): AbstractControl | null {
    return this.form4.get('level_of_education');
  }

  get expected_salary_per_hour(): AbstractControl | null {
    return this.form4.get('expected_salary_per_hour');
  }

  get field_of_study(): AbstractControl | null {
    return this.form4.get('field_of_study');
  }

  get availability_start_date(): AbstractControl | null {
    return this.form4.get('availability_start_date');
  }

  get subject(): AbstractControl | null {
    return this.form4.get('subject');
  }

  get availability_end_date(): AbstractControl | null {
    return this.form4.get('availability_end_date');
  }

  get type_of_tutoring(): AbstractControl | null {
    return this.form4.get('type_of_tutoring');
  }

  get teaching_days(): AbstractControl | null {
    return this.form4.get('teaching_days');
  }

  get teaching_hours(): AbstractControl | null {
    return this.form4.get('teaching_hours');
  }

  submitFirstForm() {
    this.loading1 = true;
    let data = {
      step: '1',
      middle_name: this.middle_name?.value,
      gender: this.gender?.value,
      nationality: this.nationality?.value,
      date_of_birth: this.dateOfBirth,
      address: this.address?.value,
      bio: this.bio?.value,
      country: this.country?.value,
      city: this.city?.value,
      postal_code: this.postal_code?.value,
    };

    this._tutorsService.sendTeacherAccount(data).subscribe((response) => {
      if (response.status === true) {
        this._alertNotificationService.success(response.message);
        this.step = 'STEP2';
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }

      this.loading1 = false;
      this.form.reset();
    });
  }

  uploadProfilePic(event: any): void {
    this.profilePic = event.target.files[0];
    this.subloading1 = false;

    // const file = event.target.files[0];
    // this.form.patchValue({ image: file });
    // this.form.get("image")?.updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result;
    // };
    // reader.readAsDataURL(file);

    //   if (event.target.files.length > 0) {
    //     var output = document.getElementById('output');
    //     output['src'] = URL.createObjectURL(event.target.files[0]);
    //     output.onload = function () {
    //       URL.revokeObjectURL(output['src']);
    //     };
    //   }
  }

  uploadCoverPic(event: any): void {
    this.coverPic = event.target.files[0];
    this.subloading2 = false;

    // if (event.target.files.length > 0) {
    //   var output = document.getElementById('output2');
    //   output['src'] = URL.createObjectURL(event.target.files[0]);
    //   output.onload = function () {
    //     URL.revokeObjectURL(output['src']);
    //   };
    // }
  }

  submitSecondForm() {
    this.loading2 = true;

    const formData = new FormData();

    formData.append(`step`, '2');
    formData.append(`avatar`, this.profilePic);
    formData.append(`cover_img`, this.coverPic);

    this._tutorsService.sendTeacherAccount(formData).subscribe((response) => {
      if (response.status === true) {
        this._alertNotificationService.success(response.message);
        this.step = 'STEP3';
      } else {
        this._alertNotificationService.error(response.errors[0]);
        // let output = document.getElementById('output');
        // output['src'] = '';
        // let output2 = document.getElementById('output2');
        // output2['src'] = '';
      }

      this.loading2 = false;
    });
  }

  submitThirdForm() {
    let languages = [];
    for (let i = 0; i < this.spokenLanguages.length; i++) {
      let data: any = {
        language: this.spokenLanguages[i]?.language,
        level: this.spokenLanguages[i]?.level,
      };

      languages.push(data);
    }

    this.loading3 = true;
    let data = {
      step: '3',
      name_of_university: this.name_of_university?.value,
      computer_skills: this.computer_skills?.value,
      degree_level: this.degree_level?.value,
      teaching_experience: this.teaching_experience?.value,
      degree_field: this.degree_field?.value,
      current_employer: this.current_employer?.value,
      current_title: this.current_title?.value,
      teaching_experience_online: this.teaching_experience_online?.value,
    };

    this._tutorsService.sendTeacherAccount(data).subscribe((response) => {
      if (response.status === true) {
        this._alertNotificationService.success(response.message);
        this.step = 'STEP4';
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }

      this.loading3 = false;
      this.form3.reset();
    });
  }

  submitFourthForm() {
    this.loading4 = true;
    let data = {
      step: '4',
      level_of_education: this.level_of_education?.value,
      expected_salary_per_hour: this.expected_salary_per_hour?.value,
      field_of_study: this.field_of_study?.value,
      availability_start_date: this.startDate,
      subject: this.subject?.value,
      availability_end_date: this.endDate,
      type_of_tutoring: this.type_of_tutoring?.value,
      teaching_days: this.teaching_days?.value,
      teaching_hours: this.teaching_days?.value,
    };

    this._tutorsService.sendTeacherAccount(data).subscribe((response) => {
      if (response.status === true) {
        this._alertNotificationService.success(response.message);
        // this.completeAccount.emit('true');
        // this._router.navigate(['/profile/tutor-profile', response?.]);
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }

      this.loading4 = false;
      this.form4.reset();
    });
  }

  loadCities(event: any) {
    let country = event.value;
    let countryId;

    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].name === country) {
        countryId = this.countries[i].id;
      }
    }
    this._lookupsService.getCities(countryId).subscribe((result) => {
      this.cities = result.cities;
    });
  }

  addLanguage() {
    let data = {
      language: this.spoken_language?.value,
      level: this.spoken_language_level?.value,
    };

    this._lookupsService.addLanguage(data).subscribe((response) => {
      if (response.status === 'true') {
        this._alertNotificationService.success(response.message);
        this.spokenLanguages = response.language;
        this.languageAdded++;
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }

      this.language.reset();
    });
  }

  removeLanguage(lang: any) {
    let data = {
      id: lang.id,
    };

    this._lookupsService.removeLanguage(data).subscribe((response) => {
      if (response.status === 'true') {
        this._alertNotificationService.success(response.message);
        this.spokenLanguages = response.language;
        this.languageAdded--;
      } else {
        this._alertNotificationService.error(response.errors[0]);
      }
    });
  }
}
