import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { addMisc, getMisc } from 'src/app/config';
import { IStatistics } from 'src/app/core/models';
import { MiscService } from 'src/app/core/services';

@Component({
  selector: 'metutors-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit, OnDestroy {
  whyWeTeach: any;
  founders: any[] = [];
  innovateApproach: any;
  valuesStatistics: any;
  whyMeTutorsList: any[] = [];
  getFoundersSub?: Subscription;
  aboutStatistics?: IStatistics[];
  getWhyWeTeachSub?: Subscription;
  getWhyMeTutorsSub?: Subscription;
  getAboutStatisticsSub?: Subscription;
  getInnovateApproachSub?: Subscription;
  getValuesStatisticsSub?: Subscription;

  constructor(private _miscService: MiscService) {}

  ngOnInit(): void {
    this.getFoundersSub = this._miscService.fetchFounders().subscribe(
      (response) => {
        this.founders = response.results;
        addMisc('founders', this.founders);
      },
      () => {}
    );
    this.founders = getMisc().founders;

    this.getInnovateApproachSub = this._miscService
      .fetchInnovateApproach()
      .subscribe(
        (response) => {
          this.innovateApproach =
            response.results && response.results.length
              ? response.results[0]
              : {};
          addMisc('innovateApproach', this.innovateApproach);
        },
        () => {}
      );
    this.innovateApproach = getMisc().innovateApproach;

    this.getValuesStatisticsSub = this._miscService
      .fetchValuesStatistics()
      .subscribe(
        (fetchedValues) => {
          this.valuesStatistics = fetchedValues;
          addMisc('valuesStatistics', this.valuesStatistics);
        },
        () => {}
      );
    this.valuesStatistics = getMisc().valuesStatistics;

    this.getAboutStatisticsSub = this._miscService
      .fetchAboutStatistics()
      .subscribe(
        (fetchedAbout) => {
          this.aboutStatistics = fetchedAbout;
          addMisc('aboutStatistics', this.aboutStatistics);
        },
        () => {}
      );
    this.aboutStatistics = getMisc().aboutStatistics;

    this.getWhyMeTutorsSub = this._miscService.fetchWhyMeTutors().subscribe(
      (fetchedValues) => {
        this.whyMeTutorsList = fetchedValues.results;
        addMisc('whyMeTutorsList', this.whyMeTutorsList);
      },
      () => {}
    );
    this.whyMeTutorsList = getMisc().whyMeTutorsList;

    this.getWhyWeTeachSub = this._miscService.fetchWhyWeTeach().subscribe(
      (fetchedValues) => {
        this.whyWeTeach =
          fetchedValues.results && fetchedValues.results.length
            ? fetchedValues.results[0]
            : {};
        addMisc('whyWeTeach', this.whyWeTeach);
      },
      () => {}
    );
    this.whyWeTeach = getMisc().whyWeTeach;
  }

  ngOnDestroy(): void {
    this.getFoundersSub?.unsubscribe();
    this.getInnovateApproachSub?.unsubscribe();
    this.getValuesStatisticsSub?.unsubscribe();
    this.getAboutStatisticsSub?.unsubscribe();
    this.getWhyMeTutorsSub?.unsubscribe();
    this.getWhyWeTeachSub?.unsubscribe();
  }
}
