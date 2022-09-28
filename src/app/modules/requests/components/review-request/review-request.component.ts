import { environment } from '@environment';
import { AcademicTutoringTextbook, TutorStatus } from 'src/app/config';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-review-request',
  templateUrl: './review-request.component.html',
  styleUrls: ['./review-request.component.scss'],
})
export class ReviewRequestComponent implements OnInit {
  @Input() reviewInfo: any;
  @Input() selectedCourse!: any;
  @Input() price: number | null;
  @Input() isCreatingCourse: boolean | null;

  @Output() onBack = new EventEmitter();
  @Output() submitForm = new EventEmitter();

  conditions = false;
  tutorStatus = TutorStatus;
  baseUrl = environment.clientUrl;
  academicTutoringTextbook = AcademicTutoringTextbook;

  constructor() {}

  ngOnInit(): void {}

  printToCart(printSectionId: string): void {
    const innerContents: string =
      document.getElementById(printSectionId)?.innerHTML || '';

    const popupWinindow = window.open(
      '',
      '_blank',
      'toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=4000, height=4000'
    );

    popupWinindow?.document.open();
    popupWinindow?.document.write(
      `
      <html>
        <head>
          <title>Invoice Details</title>
          <link href="https://fonts.googleapis.com/css2?family=Proxima+Nova" rel="stylesheet">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
          *{font-family: "Proxima Nova", sans-serif;} body{padding:20px}
          .review-request { border-radius: 12px; border: solid 1px #e2e2e2; box-shadow: none; } .review-request h2 { color: #2a2a2a; font-weight: bold; font-size: 20px; } .review-request h5 { color: #2a2a2a; font-size: 15px; font-weight: bold; } .review-request h5 span { color: #696969; font-weight: normal; } .review-request .row-block { border-bottom: 1px solid #e2e2e2; padding-bottom: 20px; margin-bottom: 20px; } .review-request .row-block h3 { color: #696969; font-weight: normal; font-size: 14px; } .review-request .row-block h4 { color: #2a2a2a; font-size: 15px; font-weight: bold; margin-bottom: 15px; } .review-request .row-block .list-classes { border-radius: 6px; border: solid 1px #ededed; margin-bottom: 20px; max-height: 70vh; overflow: auto; } .review-request .row-block .list-classes table tr { position: relative; border: none; } .review-request .row-block .list-classes table tr th { padding: 10px; color: #949494; font-size: 13px; border-top: none; background-color: #fafafa; } .review-request .row-block .list-classes table tr td { padding: 10px; border-top: 1px solid #ededed; border-bottom: none; } .review-request .row-block .list-classes table tr:first-child { background-color: #fafafa; } .review-request .row-block .topics .default-title { box-shadow: none; } .review-request .row-block .topics .default-title th { color: #949494; font-size: 14px; font-weight: normal; } .review-request .row-block .topics .default-title td { color: #2a2a2a; } .review-request .row-block .topics .default-title td mat-icon { color: #ff554b; } .review-request .row-block .later > div { border: 1px solid #ededed; padding: 30px; border-radius: 4px; color: var(--main-color); font-weight: bold; font-size: 15px; } .review-request .row-block .pdf h1 { border: 1px solid #ededed; font-size: 14px; color: #949494; background-color: #fafafa; padding: 10px; border-radius: 6px 6px 0px 0px; margin-bottom: 0; } .review-request .row-block .pdf .block-file { border: 1px solid #ededed; border-radius: 0 0 6px 6px; background: #fff; padding: 10px; } .review-request .row-block .pdf .block-file > div { width: calc(100% - (24px + 0.5rem)); } .review-request .row-block .pdf .block-file h3 { font-size: 13px; color: #696969; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; margin-bottom: 5px; } .review-request .row-block .pdf .block-file h5 { font-size: 12px; color: #696969; margin: 0; font-weight: normal; } .review-request .row-block .list-tutors .img-avatar { width: 60px; height: 60px; border-radius: 50%; margin: 0 10px 0 20px; } .review-request .row-block .list-tutors .img-avatar img { border-radius: 50%; } .review-request .row-block .list-tutors .img-avatar .status { right: -5px; top: -5px; } .review-request .row-block .list-tutors .img-avatar .status.is-online circle { fill: #00ab1e; } .review-request .row-block .list-tutors .img-avatar .status.is-offline circle { fill: #949494; } .review-request .row-block .list-tutors .img-avatar .status.is-busy circle { fill: #ad0909; } .review-request .row-block .list-tutors .img-avatar .status.is-away circle { fill: #da9312; } .review-request .row-block .list-tutors h2 { color: #2a2a2a; font-size: 15px; } .review-request .row-block .list-tutors h2 span { color: #fff; font-size: 12px; padding: 3px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; } .review-request .row-block .list-tutors h2 span.pro { background-color: #949494; } .review-request .row-block .list-tutors h2 span.verified { background-color: #007cff; } .review-request .row-block .list-tutors h3 { color: #7d7d7d; font-size: 13px; white-space: normal; } .review-request .row-block .list-tutors rating span.bs-rating-star { width: 14px; height: 14px; } .review-request .row-block .list-tutors rating span.bs-rating-star.active { color: #ff8e18; } .review-request .row-block .list-tutors .count { color: #ff8e18; font-size: 14px; margin-left: 5px; } .review-request .row-block .list-tutors .review { color: #949494; font-size: 13px; margin-left: 5px; } .review-request .row-block .list-tutors .li-item img { margin-right: 5px; width: auto; height: auto; } .review-request .row-block .list-tutors .li-item span { color: #949494; font-size: 13px; } .review-request .row-block .list-tutors .list { margin: 20px 0; } .review-request .row-block .list-tutors .list span { color: #949494; font-size: 13px; } .review-request .row-block .list-tutors .list .icon { margin-right: 5px; width: auto; } .review-request .row-block .list-tutors .full-profile:hover { color: var(--main-color); } .review-request .est-price { border-radius: 8px; background-color: #f8f8f8; padding: 15px 20px; } .review-request .est-price h5 { color: #2a2a2a; font-size: 14px; } .review-request .est-price h1 { font-size: 22px; font-weight: bold; color: #2a2a2a; margin-left: 10px; } .review-request .est-price p { color: #949494; font-size: 15px; } .review-request button, .hide-print, .review-request .row-block .list-tutors .full-profile { display: none !important }
          </style>
        </head>
        <body onload="window.print()">
          ${innerContents}
        </body>
      </html>`
    );
    popupWinindow?.document.close();
  }
}
