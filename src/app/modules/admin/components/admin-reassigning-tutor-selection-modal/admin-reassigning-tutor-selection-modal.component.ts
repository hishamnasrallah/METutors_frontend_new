import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'metutors-admin-reassigning-tutor-selection-modal',
  templateUrl: './admin-reassigning-tutor-selection-modal.component.html',
  styleUrls: ['./admin-reassigning-tutor-selection-modal.component.scss'],
})
export class AdminReassigningTutorSelectionModalComponent implements OnInit {
  @Input() tutors: any;
  @Input() timeSlots: any;
  @Input() loading = false;
  @Input() showModal = false;
  @Input() isReassigningTutor = false;
  @Input() isLoadingTimeSlots: boolean;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() reassignTutor: EventEmitter<any> = new EventEmitter<any>();
  @Output() tutorAvailability: EventEmitter<number> =
    new EventEmitter<number>();

  tutorId: null;
  showAvailability = false;
  heading = "Re-Assigning Tutor's Selection";
  subHeading = 'Please select a replacement tutor from the list below';

  constructor() {}

  goBack(): void {
    this.tutorId = null;
    this.showAvailability = false;
    this.heading = "Re-Assigning Tutor's Selection";
    this.subHeading = 'Please select a replacement tutor from the list below';
  }

  onChange(event: any): void {
    this.tutorId = event.value;
  }

  onViewAvailability(id: number): void {
    this.subHeading = '';
    this.showAvailability = true;
    this.tutorAvailability.emit(id);
    this.heading = 'Tutor Availability';
  }

  ngOnInit(): void {}
}
