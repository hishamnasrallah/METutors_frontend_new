import {
  Router,
  RouterEvent,
  NavigationEnd,
  ActivatedRoute,
  NavigationStart,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';
import * as fromCore from '@metutor/core/state';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  layout?: any;
  progressRef: NgProgressRef;
  routerSubscription$: Subscription;

  constructor(
    private _title: Title,
    private _router: Router,
    private _store: Store<any>,
    private _progress: NgProgress,
    private _route: ActivatedRoute,
    public translate: TranslateService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    if (typeof window !== 'undefined') {
      translate.addLangs(['en', 'ar']);
      translate.setDefaultLang('en');

      const browserLang = translate.getBrowserLang();
      const defaultLanguage = localStorage.getItem('DEFAULT_LANGUAGE');

      translate.use(
        defaultLanguage?.match(/en|ar/)
          ? defaultLanguage
          : browserLang?.match(/en|ar/)
          ? browserLang
          : translate.currentLang || 'en'
      );
      this._checkLangauge();

      translate.onLangChange.subscribe(() => this._checkLangauge());
    }

    this.progressRef = this._progress.ref('myProgress');

    this.routerSubscription$ = this._router.events.subscribe((event: any) => {
      this._navigationInterceptor(event);
    });
  }

  ngOnInit(): void {
    this._store.dispatch(fromCore.identifyUser());
    this._store.dispatch(fromCore.loadCurrencyRates());
    this._store.dispatch(fromCore.loadCurrenciesNames());
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
        this.layout = x?.layout;

        if (this.layout?.title) this._title.setTitle(this.layout.title);
        else this._title.setTitle('MEtutors');
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription$?.unsubscribe();
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.progressRef.start();
    }

    if (event instanceof NavigationEnd) {
      this.progressRef.complete();

      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
        this._document.documentElement.scrollTop = 0;
        this._document.body.scrollTop = 0;
      }
    }

    if (event instanceof NavigationCancel) {
      this.progressRef.complete();
    }

    if (event instanceof NavigationError) {
      this.progressRef.setConfig({ color: 'red' });
      this.progressRef.complete();
    }
  }

  private _checkLangauge(): void {
    const body = document.getElementsByTagName('body')[0];

    if (this.translate.currentLang === 'ar') {
      moment.locale('ar');
      body.setAttribute('dir', 'rtl');
    } else {
      moment.locale('en');
      body.setAttribute('dir', 'ltr');
    }
  }
}
