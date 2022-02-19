import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addMisc, getMisc } from 'src/app/config';
import { MiscService } from 'src/app/core/services';

@Component({
  selector: 'metutors-benefits-online-tutoring',
  templateUrl: './benefits-online-tutoring.component.html',
  styleUrls: ['./benefits-online-tutoring.component.scss'],
})
export class BenefitsOnlineTutoringComponent implements OnInit, OnDestroy {
  whyTeachingUsList: any[] = [];
  getWhyTeachingUsSub?: Subscription;

  constructor(private _miscService: MiscService) {}

  ngOnInit(): void {
    this.getWhyTeachingUsSub = this._miscService.fetchWhyTeachingUs().subscribe(
      (fetchedValues) => {
        this.whyTeachingUsList = fetchedValues.results;
        addMisc('whyTeachingUsList', this.whyTeachingUsList);
      },
      () => {}
    );

    this.whyTeachingUsList = getMisc().whyTeachingUsList;
  }

  ngOnDestroy(): void {
    this.getWhyTeachingUsSub?.unsubscribe();
  }
}
