import { ITutor } from '@metutor/core/models';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  WEEK_DAYS,
  generalConstants,
  COURSE_TUITION_TYPES_CONST,
} from '@metutor/config';

@Component({
  selector: 'metutors-tutor-profile-availablity-tutoring',
  templateUrl: './tutor-profile-availablity-tutoring.component.html',
  styleUrls: ['./tutor-profile-availablity-tutoring.component.scss'],
})
export class TutorProfileAvailablityTutoringComponent implements OnInit {
  @Input() isLoading: boolean;
  @Input() set tutor(_tutor: ITutor) {
    if (_tutor) {
      this._tutor = _tutor;

      if (_tutor?.availability && _tutor?.availability.length) {
        _tutor.availability.forEach((avail) => {
          if (!this.availability.includes(WEEK_DAYS[avail?.day]))
            this.availability.push(WEEK_DAYS[avail?.day]);
        });
      }
    }
  }

  @Output() tutorAvailability = new EventEmitter();

  _tutor: ITutor;
  availability: string[] = [];
  types = COURSE_TUITION_TYPES_CONST;
  nationalId = generalConstants.nationalId;

  constructor() {}

  ngOnInit(): void {}
}
