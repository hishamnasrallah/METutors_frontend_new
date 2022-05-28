import { Component, Input, OnInit } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'metutors-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
})
export class AdminFeedbackComponent implements OnInit {
  @Input() feedback: any;
  @Input() isTestimonial = false;

  imagePath = environment.imageURL;

  constructor() {}

  ngOnInit(): void {}
}
