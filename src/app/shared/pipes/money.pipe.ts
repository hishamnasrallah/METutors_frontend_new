import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import isNumber from 'lodash/isNumber';
import { switchMap } from 'rxjs/operators';
import * as fromCore from '@metutor/core/state';
import { Pipe, PipeTransform } from '@angular/core';
import { MoneyService } from '@metutor/core/services/money.service';

@Pipe({
  name: 'metutorsMoney',
})
export class MoneyPipe implements PipeTransform {
  constructor(private _money: MoneyService, private _store: Store<any>) {}

  transform(amount: any, format = true): Observable<string | null> {
    const value = amount ? +amount : undefined;

    if (isNumber(value)) {
      return this._store
        .select(fromCore.selectCurrentCurrency)
        .pipe(
          switchMap((toCurrency) =>
            this._money.convert(
              parseFloat(amount.toString()),
              toCurrency,
              format
            )
          )
        );
    }

    return of(null);
  }
}
