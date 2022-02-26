import { Component, OnInit } from '@angular/core';
import { LIST_ROUTES } from 'src/app/config';
import { AuthService } from 'src/app/core/services';
import { Location } from '@angular/common';

@Component({
  selector: 'metutors-tutor-navbar',
  templateUrl: './tutor-navbar.component.html',
  styleUrls: ['./tutor-navbar.component.scss'],
})
export class TutorNavbarComponent implements OnInit {
  location: Location;

  constructor(location: Location, public authService: AuthService) {
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