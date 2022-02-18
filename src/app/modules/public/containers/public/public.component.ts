import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from 'src/app/core/models';
import { CoursesService } from 'src/app/core/services';

@Component({
  selector: 'metutors-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit, OnDestroy {
  heightPX?: number;
  categories: ICategory[] = [];
  showMobileView: boolean = false;
  fetchMainServicesSub?: Subscription;

  constructor(private _coursesService: CoursesService) {}

  ngOnInit(): void {
    this.heightPX = window.innerHeight - 300;

    this.fetchMainServicesSub = this._coursesService
      .fetchMainServices()
      .subscribe((response) => {
        this.categories = response.results;
      });
  }

  ngOnDestroy(): void {
    this.fetchMainServicesSub?.unsubscribe();
  }
}
