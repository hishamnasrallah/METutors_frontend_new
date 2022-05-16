import { Component, Input, OnInit } from '@angular/core';
import { generalConstants, SORTED_DAYS_WEEK } from '@metutor/config';
import { ITutor } from '@metutor/core/models';

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
          if (!this.availability.includes(SORTED_DAYS_WEEK[avail?.day]))
            this.availability.push(SORTED_DAYS_WEEK[avail?.day]);
        });
      }
    }
  }

  _tutor: ITutor;

  nationalId = generalConstants.nationalId;

  availability: string[] = [];

  constructor() {}

  ngOnInit(): void {}
}
