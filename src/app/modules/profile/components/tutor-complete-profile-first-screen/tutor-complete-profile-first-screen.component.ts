import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'metutors-tutor-complete-profile-first-screen',
  templateUrl: './tutor-complete-profile-first-screen.component.html',
  styleUrls: ['./tutor-complete-profile-first-screen.component.scss']
})
export class TutorCompleteProfileFirstScreenComponent implements OnInit {

  form: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
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
  }

  ngOnInit(): void {
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

  formatDate1() {
    this.dateOfBirth = this._datePipe.transform(
      this.form.get('date_of_birth')?.value,
      'dd/MM/yyyy'
    );
  }


}
