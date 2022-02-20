import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services';
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'metutors-tutor-sidebar',
  templateUrl: './tutor-sidebar.component.html',
  styleUrls: ['./tutor-sidebar.component.scss'],
})
export class TutorSidebarComponent implements OnInit {
  hasSidemenu = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((events) => events instanceof NavigationEnd),
        map((evt) => this._route),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((x: any) => {
        this.hasSidemenu = x?.layout?.hideSidebar || false;
      });
  }

  logout(): void {
    this._authService.logout();
  }
}
