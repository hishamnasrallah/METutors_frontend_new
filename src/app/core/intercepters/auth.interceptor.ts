import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as fromCore from '@metutor/core/state';
import { first, mergeMap, Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _store: Store<any>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this._addToken(request).pipe(
      first(),
      mergeMap((requestWithToken: HttpRequest<any>) =>
        next.handle(requestWithToken)
      )
    );
  }

  private _addToken(request: HttpRequest<any>): Observable<HttpRequest<any>> {
    return this._store.select(fromCore.selectUserState).pipe(
      first(),
      map((user: any) => {
        if (user && user.token) {
          request = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${user.token}`
            ),
          });
        }

        if (user && user.tempToken) {
          request = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${user.tempToken}`
            ),
          });
        }

        return request;
      })
    );
  }
}
