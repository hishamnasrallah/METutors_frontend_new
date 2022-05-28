import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '@environment';

@Component({
  selector: 'metutors-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss'],
})
export class AdminFeedbackComponent implements OnInit {
  @Input() feedback: any;
  @Input() isTestimonial = false;

  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  imagePath = environment.imageURL;

  constructor() {}

  onButtonClick(feedback: any, type: string): void {
    const data = {
      type,
      id: feedback.sender.id,
      status: feedback.status,
    };

    this.buttonClicked.emit(data);
  }
  ngOnInit(): void {}
}
