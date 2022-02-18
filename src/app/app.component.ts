import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  RouterEvent,
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  ActivatedRoute,
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgProgressRef, NgProgress } from '@ngx-progressbar/core';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap, Subscription } from 'rxjs';
import { CoursesService } from './core/services';
import { ICategory } from './core/models';

@Component({
  selector: 'metutors-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  layout?: any;
  progressRef: NgProgressRef;
  categories: ICategory[] = [];
  routerSubscription$: Subscription;
  fetchMainServicesSub?: Subscription;

  constructor(
    private _title: Title,
    private _router: Router,
    private _progress: NgProgress,
    private _route: ActivatedRoute,
    private _coursesService: CoursesService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    moment.locale('en');
    this.progressRef = this._progress.ref('myProgress');

    this.routerSubscription$ = this._router.events.subscribe((event: any) => {
      this._navigationInterceptor(event);
    });
  }

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
        this.layout = x?.layout;

        if (this.layout?.title) this._title.setTitle(this.layout.title);
        else this._title.setTitle('ME-tutors');
      });

    this.fetchMainServicesSub = this._coursesService
      .fetchMainServices()
      .subscribe((response) => {
        this.categories = response.results;
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription$?.unsubscribe();
    this.fetchMainServicesSub?.unsubscribe();
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      window.scrollTo(0, 0);
      this.progressRef.start();
    }

    if (event instanceof NavigationEnd) {
      this.progressRef.complete();

      if (typeof window !== 'undefined') {
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
}
