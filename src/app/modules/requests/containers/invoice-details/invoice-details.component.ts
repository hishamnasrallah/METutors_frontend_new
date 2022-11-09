import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';

import { environment } from '@environment';
import * as fromCore from '@metutor/core/state';
import * as fromRequests from '@metutor/modules/requests/state';
import { SORTED_DAYS_WEEK, CLASSROOM_TOPICS_SCALE_NUM } from '@config';

import {
  ICity,
  IUser,
  ICountry,
  IClassroom,
  IInvoiceDetails,
  IClass,
} from '@metutor/core/models';

@Component({
  selector: 'metutors-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss'],
})
export class InvoiceDetailsComponent implements OnInit {
  paymentInfo$: Observable<any>;
  user$: Observable<IUser | null>;
  cities$: Observable<ICity[] | null>;
  isCreatingCourse$: Observable<boolean>;
  isApplyingCoupon$: Observable<boolean>;
  isGetInvoiceEmail$: Observable<boolean>;
  countries$: Observable<ICountry[] | null>;
  classroom$: Observable<IClassroom | null>;
  showConfirmPaymentModal$: Observable<boolean>;
  isCalculateInvoiceDetails$: Observable<boolean>;
  invoiceDetails$: Observable<IInvoiceDetails | null>;

  showModal = false;
  filterCity: string;
  filterCountry: string;
  billingForm: FormGroup;
  cities: ICity[] | null;
  coupon: string | undefined;
  countries: ICountry[] | null;
  baseURL = environment.clientUrl;

  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _store: Store<any>
  ) {}

  get city(): AbstractControl | null {
    return this.billingForm.get('city');
  }

  get state(): AbstractControl | null {
    return this.billingForm.get('state');
  }

  get street(): AbstractControl | null {
    return this.billingForm.get('street');
  }

  get country(): AbstractControl | null {
    return this.billingForm.get('country');
  }

  get postcode(): AbstractControl | null {
    return this.billingForm.get('postcode');
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

  resetCity(): void {
    this.city?.setValue(null);
    this.city?.updateValueAndValidity();
  }

  loadCities(countryId: string): void {
    this.loadCitiesByCountryId(countryId);
  }

  loadCountries(): void {
    this._store.dispatch(fromCore.loadCountries());
    this.countries$ = this._store
      .select(fromCore.selectCountries)
      .pipe(tap((country) => (this.countries = country)));
  }

  loadCitiesByCountryId(countryId: string): void {
    this._store.dispatch(fromCore.loadCities({ countryId }));
    this.cities$ = this._store
      .select(fromCore.selectCities)
      .pipe(tap((city) => (this.cities = city)));
  }

  onApplyCoupon(promo_code: string, classroom: any): void {
    const body = {
      promo_code,
      subject_id: classroom?.subject,
      classes:
        classroom?.classrooms && classroom?.classrooms.length
          ? classroom?.classrooms.map((clss: any) => ({
              date: clss.date,
              day: clss.day + 1,
              start_time: clss.start_time,
              end_time: clss.end_time,
              duration: clss.duration,
            }))
          : [],
    };

    this._store.dispatch(fromCore.applyCoupon({ body }));
  }

  ngOnInit(): void {
    this.billingForm = this._fb.group({
      city: [null, Validators.required],
      country: [null, Validators.required],
      state: [null, [Validators.required, Validators.maxLength(50)]],
      street: [null, [Validators.required, Validators.maxLength(250)]],
      postcode: [null, [Validators.required, Validators.maxLength(20)]],
    });

    this.loadCountries();
    this._store.dispatch(fromCore.enterInvoiceDetails());
    this._store.dispatch(fromCore.calculateFinalInvoice({}));
    this.user$ = this._store.select(fromCore.selectUser);
    this.classroom$ = this._store.select(fromCore.selectCreatedClass);

    this.isCalculateInvoiceDetails$ = this._store.select(
      fromCore.selectIsCalculateFinalInvoice
    );

    this.invoiceDetails$ = this._store
      .select(fromCore.selectInvoiceDetails)
      .pipe(
        tap((invoice) => {
          this.coupon = invoice?.coupon;
          if (invoice?.user?.billingInfo) {
            const { city, state, street, country, postcode } =
              invoice?.user.billingInfo;

            this.billingForm.patchValue({
              city,
              state,
              street,
              postcode,
              country: Number(country),
            });

            this.loadCities(country);
          }
        })
      );

    this.paymentInfo$ = this._store.select(fromCore.selectRequestPaymentInfo);

    this.isCreatingCourse$ = this._store.select(
      fromCore.selectRequestedIsCreatingCourse
    );

    this.isApplyingCoupon$ = this._store.select(
      fromCore.selectIsApplyingCoupon
    );

    this.isGetInvoiceEmail$ = this._store.select(
      fromCore.selectIsGetInvoiceEmail
    );

    this.showConfirmPaymentModal$ = this._store.select(
      fromRequests.selectIsConfirmPaymentModal
    );
  }

  saveCourse(user: IUser, classroom: any, billing: FormGroup): void {
    //this.showModal = true;
    //return;

    if (user) {
      const start_time = new Date(
        Date.parse(classroom.startDate + ' ' + classroom.startTime)
      )?.toISOString();

      const end_time = new Date(
        Date.parse(classroom.endDate + ' ' + classroom.endTime)
      )?.toISOString();

      const weekdays =
        classroom.days && classroom.days.length
          ? classroom.days.map(
              (day: string) => SORTED_DAYS_WEEK.indexOf(day) + 1
            )
          : [];

      const highlighted_topics = classroom.topics.map((topic: any) => ({
        name: topic.name,
        knowledge_scale: CLASSROOM_TOPICS_SCALE_NUM[topic.scale],
      }));

      const classes = classroom.classrooms.map((classroom: any) => ({
        day: +classroom.day + 1,
        duration: classroom.duration,
        date: new Date(classroom?.date)?.toISOString(),
        start_time: new Date(
          Date.parse(classroom?.date + ' ' + classroom?.start_time)
        )?.toISOString(),
        end_time: new Date(
          Date.parse(classroom?.date + ' ' + classroom?.end_time)
        )?.toISOString(),
      }));

      const data = {
        classes,
        end_time,
        start_time,
        highlighted_topics,
        coupon: this.coupon,
        file: classroom.file,
        author: classroom.author,
        book_name: classroom.name,
        class_type: classroom.type,
        weekdays: weekdays.join(','),
        total_hours: classroom.hours,
        subject_id: classroom.subject,
        language_id: classroom.language,
        book_edition: classroom.edition,
        teacher_id: classroom.tutor?.id,
        book_info: classroom.information,
        total_price: classroom.totalPrice,
        total_classes: classroom.classes,
        course_level: classroom.courseLevel,
        country_id: classroom.courseCountry,
        program_id: classroom.courseProgram,
        field_of_study: classroom.courseField,
        end_date: new Date(classroom.endDate)?.toISOString(),
        start_date: new Date(classroom.startDate)?.toISOString(),
        redirect_url: this.baseURL + '/requests/payment-processing',
        billing_info: { ...billing.value },
      };

      if (classroom?.isFree) {
        this._store.dispatch(
          fromCore.createFreeCourse({
            data: {
              ...data,
              total_price: 0,
            },
          })
        );
      } else {
        this._store.dispatch(fromCore.createCourse({ data }));
      }
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }

  getInvoiceEmail(user: IUser, invoiceDetails: IInvoiceDetails): void {
    if (user) {
      this._store.dispatch(
        fromCore.getInvoiceEmail({
          info: {
            email: user.email,
            noOfClasses: invoiceDetails.noOfClasses,
            pricePerHour: invoiceDetails.pricePerHour,
            totalHours: invoiceDetails.totalHours,
            totalAmount: invoiceDetails.totalAmount,
            invoiceNumber: '#IN37738',
            date: new Date(),
          },
        })
      );
    } else {
      this._router.navigate(['/signin'], {
        queryParams: {
          returnUrl: this._router.url,
        },
      });
    }
  }

  printToCart(printSectionId: string): void {
    const innerContents: string =
      document.getElementById(printSectionId)?.innerHTML || '';

    const popupWinindow = window.open(
      '',
      '_blank',
      'toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=4000, height=4000'
    );

    popupWinindow?.document.open();
    popupWinindow?.document.write(
      `
      <html>
        <head>
          <title>Invoice Details</title>
          <link href="https://fonts.googleapis.com/css2?family=Proxima+Nova" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
          *{font-family: "Proxima Nova", sans-serif;} body{padding:20px}
          .invoice-header {margin-bottom: 35px;} .invoice-header span { margin-right: 5px; } .invoice-header .invoice-email, .invoice-header .print, ul li.coupon, .pay-now, .billing-details { display:none !important } ul li { margin-bottom: 15px; } ul li span { color: #696969; font-size: 16px; } ul li strong { color: #000; font-size: 16px; } ul li.promocode span, ul li.promocode strong { color: #ff554b; } ul li.total-payment { padding: 15px 0; border-top: 1px solid #e2e2e2; } ul li.coupon span, ul li.total-payment span, ul li.coupon strong, ul li.total-payment strong { font-size: 18px; } .have-coupon input { border-radius: 4px 0 0 4px; } .have-coupon button { border-radius: 0 4px 4px 0; background-color: #2a2a2a; color: #fff; }
          .class-details h2 { color: #2a2a2a; font-size: 20px; height: 50px; } .class-details .card { border-radius: 12px; border: solid 1px #e2e2e2; background-color: #fff; box-shadow: none; margin-bottom: 20px; } .class-details .card h3 { color: #696969; font-size: 16px; } .class-details .card h4 { white-space: nowrap; width: 100%; overflow: hidden; text-overflow: ellipsis; color: #2a2a2a; font-size: 16px; font-weight: bold; } .class-details .card h5 { color: #2a2a2a; font-size: 13px; margin: 10px 0 0; } .class-details .card .count { color: #ff8300; font-weight: bold; margin-right: 5px; } .class-details .card .review { color: #7d7d7d; font-size: 14px; } .class-details .card ul li { margin: 5px 0; } .class-details .card ul li span { margin-left: 15px; color: #2a2a2a; font-size: 15px; } .class-details .card .informations span { color: #696969 !important; } .class-details .card .informations strong { color: #2a2a2a; font-size: 14px; } .class-details .card .b-border { padding-bottom: 1rem; border-bottom: 1px solid #e2e2e2; } .class-details .card .info img { width: 40px; height: 40px; border-radius: 50%; } .class-details .card .info h2 { color: #2a2a2a; font-size: 14px; height: auto; font-weight: bold; } .class-details .card .info h3 { color: #696969; font-size: 12px; margin: 0; } .class-details .card .info h6 { color: #696969; font-size: 16px; margin-bottom: 15px; }
          </style>
        </head>
        <body onload="window.print()">
          ${innerContents}
        </body>
      </html>`
    );
    popupWinindow?.document.close();
  }
}
