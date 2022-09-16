import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'metutors-home-study-more-read-more',
  templateUrl: './home-study-more-read-more.component.html',
  styleUrls: ['./home-study-more-read-more.component.scss'],
})
export class HomeStudyMoreReadMoreComponent implements OnInit {
  constructor(private _viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}

  scrollToAnchor(): void {
    this._viewportScroller.scrollToAnchor('explore-services');
  }
}
