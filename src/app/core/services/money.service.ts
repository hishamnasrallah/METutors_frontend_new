import * as fx from 'money';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, withLatestFrom } from 'rxjs/operators';

import * as fromCore from '../state';

@Injectable({
  providedIn: 'root',
})
export class MoneyService {
  constructor(
    private _http: HttpClient,
    private _store: Store<any>,
    private _currencyPipe: CurrencyPipe
  ) {}

  convert(amount: any, toCurreny: string, format = true): Observable<any> {
    return this._store.pipe(
      select(fromCore.selectCurrencyRates),
      withLatestFrom(this._store.select(fromCore.selectBaseCurrency)),
      map(([rates, base]) => {
        if (rates && base) {
          (fx.base as any) = base?.toString();
          (fx.rates as any) = { ...rates };

          return fx.convert(amount, {
            from: base,
            to: toCurreny,
          });
        } else {
          return of(null);
        }
      }),
      map((convertedAmount: any) => {
        if (format) {
          return this._currencyPipe.transform(convertedAmount, toCurreny);
        }

        if (toCurreny) {
          return this._currencyPipe.transform(
            convertedAmount,
            toCurreny,
            'symbol',
            '1.2-4'
          );
        }

        return convertedAmount;
      })
    );
  }

  getLatestCurrencyRates(): Observable<any> {
    return this._http.get<any>(
      // eslint-disable-next-line max-len
      `https://openexchangerates.org/api/latest.json?app_id=f8c855e3288d4f81ace95b4c8ae703f8&base=USD&symbols=AED,EGP,DZD,AUD,BHD,EUR,BRL,BGN,CAD,CNY,COP,HRK,CZK,DKK,DOP,HKD,HUF,ISK,INR,IDR,JPY,JOD,KES,KRW,KWD,MXN,MAD,NZD,NOK,OMR,PKR,PYG,PHP,PLN,QAR,RON,RUB,RWF,SAR,RSD,SGD,ZAR,LKR,SEK,CHF,TWD,TZS,THB,TND,TRY,UAH,GBP,USD`
    );
  }

  getCurrenciesNames(): Observable<any> {
    return this._http.get<any>(
      `https://openexchangerates.org/api/currencies.json`
    );
  }
}
