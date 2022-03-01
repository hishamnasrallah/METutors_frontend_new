import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable()
export class TutorAuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this._authService.getIsTutorAuth();

    if (!isAuth) {
      localStorage.removeItem('token');
      this.router.navigate(['/signin'], {
        queryParams: { returnUrl: state.url },
      });
    }

    return isAuth;
  }
}
