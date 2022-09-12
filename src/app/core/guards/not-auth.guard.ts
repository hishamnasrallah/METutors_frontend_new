import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromCore from '@metutor/core/state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotAuthGuard implements CanActivate {
  constructor(private _store: Store<any>, private _router: Router) {}

  canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    return this._store.pipe(
      select(fromCore.selectToken),
      map((token) => {
        if (token) {
          this._router.navigateByUrl('/access-denied');

          return false;
        }

        return true;
      })
    );
  }
}
