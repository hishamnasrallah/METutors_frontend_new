import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { insightRange } from '@config';
import * as fromRoot from '@metutor/state';
import * as fromStudent from '../../state';
import { FormGroup } from '@angular/forms';
import { environment } from '@environment';
import { IUser } from '@metutor/core/models';
import * as fromCore from '@metutor/core/state';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, combineLatest } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromStudentActions from '../../state/actions';

@Component({
  selector: 'metutors-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss'],
})
export class StudentDashboardComponent implements OnInit {
  layout$: any;
  user$: Observable<IUser | null>;
  isJoiningClass$: Observable<boolean>;
  isLoadingViewClass$: Observable<boolean>;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay: true,
    navSpeed: 900,
    navText: [
      '<mat-icon>chevron_left</mat-icon>',
      '<mat-icon>chevron_right</mat-icon>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 2,
      },
    },
    nav: false,
  };

  range = '7days';
  insightRange = insightRange;
  tabLabel = 'METUTORS_FEEDBACK';
  imageUrl = environment.imageURL;
  showSendFeedbackModal$: Observable<boolean>;
  subHeading = 'SHARE_FEEDBACK_METUTORS_SERVICE';
  messageLabel = 'SHARE_THOUGHTS_IMPROVE_SERVICES';

  view$: Observable<{
    loading: boolean;
    dashboard: any;
  }>;

  constructor(private _store: Store<any>) {}

  loadDashboard(params: string): void {
    this.range = params;
    this._store.dispatch(fromCore.loadStudentDashboard({ params, load: true }));
  }

  onOpenFeedbackModal(): void {
    this._store.dispatch(
      fromStudentActions.openStudentSendPlatformFeedbackModal()
    );
  }

  onCloseFeedbackModal(): void {
    this._store.dispatch(
      fromStudentActions.closeStudentSendPlatformFeedbackModal()
    );
  }

  onSubmitFeedback(form: FormGroup): void {
    const body = form.value;
    this._store.dispatch(fromCore.studentSubmitPlatformFeedback({ body }));
  }

  joinClass(id: number): void {
    this._store.dispatch(fromCore.studentJoinClass({ id }));
  }

  viewClass(id: number): void {
    this._store.dispatch(fromCore.studentViewClass({ id }));
  }

  ngOnInit(): void {
    this.user$ = this._store.select(fromCore.selectUser);
    this.layout$ = this._store.select(fromRoot.selectLayout);
    this.isJoiningClass$ = this._store.select(fromCore.selectIsJoiningClass);
    this.isLoadingViewClass$ = this._store.select(
      fromCore.selectStudentLoading
    );

    this.showSendFeedbackModal$ = this._store.select(
      fromStudent.selectSendFeedbackModal
    );

    this._store.dispatch(
      fromCore.loadStudentDashboard({ params: this.range, load: false })
    );

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentDashboard),
      this._store.select(fromCore.selectIsLoadingStudentDashboard),
    ]).pipe(
      map(([dashboard, loading]) => ({
        loading,
        dashboard,
      }))
    );
  }
}
