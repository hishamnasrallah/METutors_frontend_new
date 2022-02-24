import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ITutor } from 'src/app/core/models';
import { TutorsService } from 'src/app/core/services';

@Component({
  selector: 'metutors-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.scss'],
})
export class TutorProfileComponent implements OnInit, OnDestroy {
  tutor?: ITutor;
  getTutorByIdSub?: Subscription;

  constructor(
    private _title: Title,
    private _route: ActivatedRoute,
    private _tutorService: TutorsService
  ) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe((res: ParamMap) => {
      const id = res.get('id') || '';
      this.getTutorByIdSub = this._tutorService
        .getTutorById(id)
        .subscribe((response) => {
          this.tutor = response;
          console.log(this.tutor)
          this._title.setTitle(this.tutor?.name || '');
        });
    });
  }

  ngOnDestroy(): void {
    this.getTutorByIdSub?.unsubscribe();
  }
}
