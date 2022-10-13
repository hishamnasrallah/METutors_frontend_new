import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { generalConstants } from '@config';
import * as fromCore from '@metutor/core/state';
import { Observable, combineLatest } from 'rxjs';
import * as fromTutor from '@metutor/modules/tutor/state';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-tutor-add-assignment-modal',
  templateUrl: './tutor-add-assignment-modal.component.html',
  styleUrls: ['./tutor-add-assignment-modal.component.scss'],
})
export class TutorAddAssignmentModalComponent implements OnInit {
  @Input() courseId: number;
  @Input() showModal: boolean = false;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup;
  minDate: any = new Date();
  selectedURLs: any[] = [];
  filesPreview: any[] = [];

  params$: Observable<any>;
  assignees$: Observable<any>;
  uploadedFiles$: Observable<any>;
  fileUploadProgress$: Observable<any>;
  isAddingAssignment$: Observable<boolean>;
  uploadComplete = generalConstants.uploadComplete;
  view$: Observable<{ loading: boolean; assignment: any }>;

  constructor(private _fb: FormBuilder, private _store: Store<any>) {}

  ngOnInit(): void {
    this._store.dispatch(fromCore.resetUploadedFiles());
    this._store.dispatch(fromCore.tutorResetSelectedAssignment());
    this.params$ = this._store.select(fromTutor.selectTutorStateParams);

    this.form = this._fb.group({
      id: [null],
      files: [null, Validators.required],
      endDate: [null, Validators.required],
      assignee: [null, Validators.required],
      startDate: [null, Validators.required],
      course_id: [this.courseId, Validators.required],
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null, [Validators.required, Validators.minLength(10)]],
      urls: this._fb.group(
        {
          title: [null],
          url: [null, [Validators.pattern(generalConstants.regex.url)]],
        },
        { validators: this._urlValidation.bind(this) }
      ),
    });

    this.fileUploadProgress$ = this._store
      .select(fromCore.selectFileUploadingProgress)
      .pipe(
        tap((progress) => {
          progress?.map((response: any) => {
            if (response.responseType === this.uploadComplete) {
              this.files?.markAsDirty();
            }
          });
        })
      );

    this.isAddingAssignment$ = this._store.select(
      fromCore.selectIsAddingAssignment
    );

    this.assignees$ = this._store.select(
      fromCore.selectTutorAssignmentAssignees
    );

    this.uploadedFiles$ = this._store
      .select(fromCore.selectUploadedFiles)
      .pipe(tap((files) => this.files?.setValue(files)));

    this.view$ = combineLatest([
      this._store.select(fromCore.selectTutorAssignment).pipe(
        tap((data: any) => {
          if (data) {
            this.minDate = null;
            if (data?.assignment?.urls?.length) {
              this.selectedURLs = [...data.assignment?.urls];
            }

            if (data?.assignment?.files?.length) {
              this.files?.setValue(data.assignment.files);
              this._store.dispatch(
                fromCore.setFiles({ files: data.assignment.files })
              );
            }

            const assignees = data?.assignment?.assignees.map(
              (assi: any) => assi.userId
            );

            this.assignee?.setValue(assignees);
            this.id?.setValue(data?.assignment?.id);
            this.title?.setValue(data?.assignment?.title);
            this.endDate?.setValue(data?.assignment?.deadline);
            this.startDate?.setValue(data?.assignment?.startDate);
            this.description?.setValue(data?.assignment?.description);
          }
        })
      ),
      this._store.select(fromCore.selectIsLoadingTutorAssignment),
    ]).pipe(map(([assignment, loading]) => ({ loading, assignment })));
  }

  get files(): AbstractControl | null {
    return this.form?.get('files');
  }

  get description(): AbstractControl | null {
    return this.form?.get('description');
  }

  get urls(): FormGroup {
    return this.form?.get('urls') as FormGroup;
  }

  get invalidUrl(): any {
    return this.urls?.controls['url'].errors;
  }

  get startDate(): AbstractControl | null {
    return this.form.get('startDate');
  }

  get endDate(): AbstractControl | null {
    return this.form.get('endDate');
  }

  get title(): AbstractControl | null {
    return this.form.get('title');
  }

  get assignee(): AbstractControl | null {
    return this.form.get('assignee');
  }

  get id(): AbstractControl | null {
    return this.form.get('id');
  }

  onChangeDateDay(): void {
    if (this.startDate?.value && this.endDate?.value) {
      if (this.endDate.value < this.startDate.value) {
        this.endDate.setValue(null);
      }
    }
  }

  removeURL(i: number): void {
    this.selectedURLs.splice(i, 1);
    this.form.get('urls')?.updateValueAndValidity();
  }

  addURL(): void {
    this.selectedURLs.push(this.urls.value);
    this.urls.get('url')?.setValue(null);
    this.urls.get('title')?.setValue(null);
  }

  removeFile(id: number): void {
    this._store.dispatch(fromCore.deleteUploadedFile({ id }));
  }

  onFileChange(event: any): void {
    if (event.target && event.target.files && event.target.files.length) {
      const file = [...event.target.files];
      this._store.dispatch(fromCore.uploadFile({ file }));
    }
  }

  onSubmit(): void {
    const { startDate, endDate, ..._body } = this.form.value;
    const body = {
      ..._body,
      urls: this.selectedURLs,
      deadline: moment(this.endDate?.value).format('Y-MM-DD'),
      start_date: moment(this.startDate?.value).format('Y-MM-DD'),
    };

    if (this.id?.value) {
      this._store.dispatch(fromCore.tutorEditAssignment({ body }));
    } else {
      this._store.dispatch(fromCore.tutorAddAssignment({ body }));
    }
  }

  private _urlValidation(control: AbstractControl): any {
    const url = control.get('url');
    const title = control.get('title');

    if (!this.selectedURLs.length) {
      return { required: true };
    }

    if (url?.value && !title?.value) {
      return { required: true };
    }

    if (!url?.value && title?.value) {
      return { required: true };
    }

    return null;
  }
}
