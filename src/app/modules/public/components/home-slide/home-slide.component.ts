import { IUser } from '@metutor/core/models';
import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FreeClassroomDemo, UserRole } from '@metutor/config';

@Component({
  selector: 'metutors-home-slide',
  templateUrl: './home-slide.component.html',
  styleUrls: ['./home-slide.component.scss']
})
export class HomeSlideComponent implements OnInit {
  @Input() user: IUser;
  @Input() token: string;
  @Input() isDemo: number;

  userRole = UserRole;
  freeDemo = FreeClassroomDemo;

  constructor(private _viewportScroller: ViewportScroller) {}

  ngOnInit(): void {}

  scrollToAnchor(): void {
    this._viewportScroller.scrollToAnchor('explore-services');
  }
}
