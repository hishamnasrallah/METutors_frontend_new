import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from '../../services';

@Component({
  selector: 'metutors-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  admin = false;
  isRefereshed = true;
  isRememberedUser = false;

  constructor(
    private _router: Router,
    public authService: AuthService,
    private _socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.checkReload();
    this.checkRememberUser();
  }

  ngOnChanges() {
    this.checkReload();
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
  }
}
