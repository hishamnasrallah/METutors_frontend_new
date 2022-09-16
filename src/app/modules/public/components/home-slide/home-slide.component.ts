import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'metutors-home-slide',
  templateUrl: './home-slide.component.html',
  styleUrls: ['./home-slide.component.scss'],
})
export class HomeSlideComponent implements OnInit {
  @Input() token: string;
  
  constructor(private _viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}

  scrollToAnchor(): void {
    this._viewportScroller.scrollToAnchor('explore-services');
  }
}
