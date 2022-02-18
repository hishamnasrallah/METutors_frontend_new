import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { ICategory } from '../../models';
import { AuthService } from '../../services';

@Component({
  selector: 'metutors-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  host: {
    '(window:scroll)': 'updateHeader($event)',
  },
})
export class NavbarComponent implements OnInit {
  admin = false;
  isRefereshed = true;
  isRememberedUser = false;
  scrollTop: boolean = false;
  @Input() categories?: ICategory[];

  constructor(
    private router: Router,
    public authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.checkReload();
    this.checkRememberUser();
    this.isAdmin();
    if (!this.isRefereshed && !this.isRememberedUser)
      localStorage.removeItem('token');
  }

  ngOnChanges() {
    this.checkReload();
    this.isAdmin();
  }

  updateHeader(evt: any) {
    if (window.pageYOffset >= 65) {
      this.scrollTop = true;
    } else {
      this.scrollTop = false;
    }
  }

  isAdmin() {
    let session = localStorage.getItem('role');
    if (session === 'admin-temporary') {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    } else {
      this.admin = true;
    }
  }

  checkRememberUser() {
    let session = localStorage.getItem('active');
    if (session) {
      this.isRememberedUser = true;
    } else {
      this.isRememberedUser = false;
    }
  }

  checkReload() {
    let session = sessionStorage.getItem('active');
    if (session) {
      this.isRefereshed = true;
    } else {
      this.isRefereshed = false;
    }
  }

  // getCookie(name: string) {
  //   let cookie = {};
  //   document.cookie.split(';').forEach(function (el) {
  //     let [k, v] = el.split('=');
  //     cookie[k.trim()] = v;
  //   });
  //   return cookie[name];
  // }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    localStorage.removeItem('active');
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }
}
