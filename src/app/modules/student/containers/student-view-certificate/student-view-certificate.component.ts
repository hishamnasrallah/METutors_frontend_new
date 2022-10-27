import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import domtoimage from 'dom-to-image';

import { IUser } from '@models';
import * as fromRoot from '@metutor/state';
import * as fromCore from '@metutor/core/state';
import { map } from 'rxjs/operators';

@Component({
  selector: 'metutors-student-view-certificate',
  templateUrl: './student-view-certificate.component.html',
  styleUrls: ['./student-view-certificate.component.scss'],
})
export class StudentViewCertificateComponent implements OnInit {
  @ViewChild('certificate', { static: false }) certificate: ElementRef;

  layout$: any;
  user$: Observable<IUser | null>;
  view$: Observable<{ loading: boolean; certificate: any }>;

  constructor(private _store: Store<any>) {}

  printCertificate(): void {}

  downloadCertificate(): void {
    domtoimage.toJpeg(this.certificate.nativeElement).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = 'certificate.jpeg';
      link.href = dataUrl;
      link.click();
    });
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.loadStudentCertificate());

    this.user$ = this._store.select(fromCore.selectUser);
    this.layout$ = this._store.select(fromRoot.selectLayout);

    this.view$ = combineLatest([
      this._store.select(fromCore.selectStudentLoading),
      this._store.select(fromCore.selectStudentCertificate),
    ]).pipe(map(([loading, certificate]) => ({ loading, certificate })));
  }
}
