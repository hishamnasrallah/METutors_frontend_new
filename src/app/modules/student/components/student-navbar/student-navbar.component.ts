import { Component, Input, OnInit } from '@angular/core';
import { LIST_ROUTES } from 'src/app/config';
import { Location } from '@angular/common';
import { IUser } from '@metutor/core/models';

@Component({
  selector: 'metutors-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.scss'],
})
export class StudentNavbarComponent implements OnInit {
  @Input() user: IUser | null;
  
  location: Location;

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {}

  getTitle(): string {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    let title = 'Dashboard';

    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    LIST_ROUTES.forEach((route) => {
      if (route.path === titlee) {
        title = route.title;
      }
    });

    return title;
  }
}